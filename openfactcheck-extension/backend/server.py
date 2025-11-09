from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openfactcheck import OpenFactCheck, OpenFactCheckConfig
import uvicorn
import os
from dotenv import load_dotenv
from fastapi.concurrency import run_in_threadpool

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Allow Chrome extension to make requests (CORS)
# WARNING: In production, replace ["*"] with your actual extension ID (e.g., ["chrome-extension://YOUR_ID"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Initialization 
try:
    print("Initializing OpenFactCheck with default configuration...")
    # Initialize with defaults. It will automatically look for .env variables.
    config = OpenFactCheckConfig()
    ofc = OpenFactCheck(config)
    print("OpenFactCheck initialized successfully.")
except Exception as e:
    print(f"CRITICAL ERROR initializing OpenFactCheck: {e}")
    ofc = None

class CheckRequest(BaseModel):
    text: str
    # Optional fields for pipeline configuration with defaults
    claim_processor: str = "factool_claimprocessor"
    retriever: str = "factool_retriever"
    verifier: str = "factool_verifier"

@app.post("/check")
async def check_text(req: CheckRequest):
    if not ofc:
        raise HTTPException(status_code=500, detail="Fact checker not initialized.")

    print(f"\n>>> Received request: {req.text[:50]}...")
    print(f">>> Pipeline: {req.claim_processor} -> {req.retriever} -> {req.verifier}")

    try:
        # 1. Configure pipeline dynamically based on request
        ofc.init_pipeline_manually([
            req.claim_processor,
            req.retriever,
            req.verifier
        ])

        # 2. Define a helper to run synchronously in a separate thread
        def run_full_evaluation(text):
            # evaluate_streaming yields results step-by-step.
            # We list() it to consume the whole stream and get all details.
            return list(ofc.ResponseEvaluator.evaluate_streaming(response=text))

        # 3. Run it in a thread to avoid blocking the main event loop
        full_report = await run_in_threadpool(run_full_evaluation, req.text)

        # 4. Format the output for easier use by your extension
        formatted_result = {
            "status": "success",
            "claims": [],
            "evidences": {},
            "verification_details": {},
            "overall_label": "Unknown"
        }

        for step in full_report:
            solver_name = step.get("solver_name", "")
            output = step.get("output", {})

            if "claimprocessor" in solver_name:
                formatted_result["claims"] = output.get("claims", [])
            elif "retriever" in solver_name:
                 formatted_result["evidences"] = output.get("claims_with_evidences", {})
            elif "verifier" in solver_name:
                formatted_result["overall_label"] = output.get("label", "Unknown")
                formatted_result["verification_details"] = output.get("detail", {})

        print(">>> Detailed evaluation complete. Sending response.")
        return formatted_result

    except Exception as e:
        print(f"ERROR during evaluation: {e}")
        # Re-raise as an HTTP exception so the client gets a proper error code
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("Starting OpenFactCheck API server on port 8000...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
