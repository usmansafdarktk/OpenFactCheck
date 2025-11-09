// =========================================
// 1. INJECT REFINED CSS STYLES
// =========================================
const style = document.createElement('style');
style.textContent = `
  :host {
    all: initial;
  }
  #ofc-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    position: fixed;
    top: 20px;
    right: 20px;
    width: 380px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.25);
    z-index: 2147483647;
    overflow: hidden;
    animation: ofc-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid #e2e8f0;
    font-size: 14px;
    line-height: 1.5;
    color: #334155;
  }

  @keyframes ofc-slide-in {
    from { transform: translateX(50px) scale(0.95); opacity: 0; }
    to { transform: translateX(0) scale(1); opacity: 1; }
  }

  /* --- HEADER --- */
  #ofc-header {
    background: #005355;
    color: #ffffff;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  #ofc-title {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  #ofc-close {
    background: rgba(255,255,255,0.1);
    border: none;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  #ofc-close:hover {
    background: rgba(255,255,255,0.25);
    color: #ffffff;
  }

  /* --- BODY CONTAINER --- */
  #ofc-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  #ofc-body::-webkit-scrollbar { width: 6px; }
  #ofc-body::-webkit-scrollbar-track { background: transparent; }
  #ofc-body::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }

  /* --- CONFIGURATION SCREEN STYLES --- */
  .ofc-form-group {
    margin-bottom: 20px;
  }
  .ofc-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  .ofc-select {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background-color: #f8fafc;
    font-size: 14px;
    color: #334155;
    outline: none;
    transition: border-color 0.2s, background-color 0.2s;
    cursor: pointer;
    appearance: none; /* Removes default OS arrow */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }
  .ofc-select:focus {
    border-color: #005355;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 83, 85, 0.1);
  }
  #ofc-start-btn {
    width: 100%;
    padding: 14px;
    background-color: #005355;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }
  #ofc-start-btn:hover {
    background-color: #003d3f;
  }
  .ofc-context-preview {
    padding: 16px;
    background: #f1f5f9;
    border-left: 4px solid #94a3b8;
    font-size: 13px;
    color: #475569;
    font-style: italic;
    margin-bottom: 24px;
    border-radius: 0 8px 8px 0;
    line-height: 1.5;
  }

  /* --- VERDICT BANNERS --- */
  .ofc-verdict-banner {
    margin: 0;
    padding: 14px 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    border-bottom: 1px solid transparent;
    flex-shrink: 0;
  }
  .ofc-verdict-true { background: #ecfdf5; color: #065f46; border-bottom-color: #a7f3d0; }
  .ofc-verdict-false { background: #fef2f2; color: #991b1b; border-bottom-color: #fecaca; }
  .ofc-verdict-error { background: #f8fafc; color: #475569; border-bottom-color: #e2e8f0; }

  /* --- DETAIL BOXES --- */
  .ofc-detail-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    line-height: 1.6;
    color: #334155;
  }
  .ofc-correction-box { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }

  /* --- SECTIONS & EVIDENCE --- */
  .ofc-section-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #005355;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 24px 0 12px 0;
    top: 0;
    background: #fff;
    padding: 10px 0;
    z-index: 1;
  }
  .ofc-evidence-list { display: flex; flex-direction: column; gap: 12px; }
  .ofc-evidence-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #005355;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.5;
    transition: all 0.2s;
  }
  .ofc-evidence-card:hover {
    border-color: #cbd5e1;
    border-left-color: #005355;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transform: translateY(-1px);
  }
  .ofc-evidence-source {
    font-weight: 700;
    color: #005355;
    margin-bottom: 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
  }

  /* --- LOADING STATE --- */
  .ofc-loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; color: #005355; }
  .ofc-spinner { width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #005355; border-radius: 50%; animation: ofc-spin 0.8s ease-in-out infinite; margin-bottom: 24px; }
  @keyframes ofc-spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// =========================================
// 2. MAIN LOGIC & STATE
// =========================================
let rootElement = null;
let currentSelectedText = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SHOW_CONFIG") {
    currentSelectedText = message.text;
    showConfigUI();
  } else if (message.action === "SHOW_LOADING") {
    showLoadingUI(message.text);
  } else if (message.action === "SHOW_RESULT") {
    updateUIWithResult(message.data);
  } else if (message.action === "SHOW_ERROR") {
    showErrorUI(message.error);
  }
});

// --- UI BUILDER HELPERS ---
function ensureRootExists() {
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'ofc-root';
    document.body.appendChild(rootElement);
  }
  return rootElement;
}

function createHeader() {
  return `
    <div id="ofc-header">
      <div id="ofc-title"><span style="font-size: 20px;">🛡️</span> OpenFactCheck</div>
      <button id="ofc-close" title="Close">✕</button>
    </div>
  `;
}

function attachCloseHandlers() {
  const closeBtn = rootElement.querySelector('#ofc-close');
  if (closeBtn) {
    closeBtn.onclick = () => { rootElement.remove(); rootElement = null; };
  }
}

// --- 1. CONFIGURATION SCREEN ---
function showConfigUI() {
  const root = ensureRootExists();
  // POINTER 2: Added Intro Text
  // POINTER 3: Added two-column layout for first two dropdowns
  root.innerHTML = `
    ${createHeader()}
    <div id="ofc-body">
      <div class="ofc-section-label" style="margin-top: 0;">Selected Text</div>
      <div class="ofc-context-preview">"${currentSelectedText.substring(0, 120)}${currentSelectedText.length > 120 ? '...' : ''}"</div>

      <div style="margin-top: 30px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 8px 0; color: #005355; font-size: 18px; font-weight: 700;">Pipeline Configuration</h2>
        <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.4;">
          Customize the AI agents used to verify this text.
        </p>
      </div>

      <div class="ofc-col" style="flex: 1;">
          <div class="ofc-form-group">
            <label class="ofc-label" for="ofc-cp">Claim Processor</label>
            <select id="ofc-cp" class="ofc-select">
              <option value="factool_claimprocessor">Factool (Fast)</option>
              <option value="factcheckgpt_claimprocessor" selected>FactCheckGPT (Accurate)</option>
              <option value="urdufactcheck_claimprocessor">UrduFactCheck</option>
            </select>
          </div>
      </div>

      <div class="ofc-col" style="flex: 1;">
          <div class="ofc-form-group">
            <label class="ofc-label" for="ofc-rtv">Retriever</label>
            <select id="ofc-rtv" class="ofc-select">
              <option value="factool_retriever">Factool (Google)</option>
              <option value="factcheckgpt_retriever" selected>FactCheckGPT (Deep)</option>
              <option value="urdufactcheck_retriever">UrduFactCheck</option>
            </select>
          </div>
      </div>

      <div class="ofc-form-group">
        <label class="ofc-label" for="ofc-vfr">Verifier</label>
        <select id="ofc-vfr" class="ofc-select">
          <option value="factool_verifier">Factool (Basic)</option>
          <option value="factcheckgpt_verifier" selected>FactCheckGPT (Advanced)</option>
          <option value="urdufactcheck_verifier">UrduFactCheck</option>
        </select>
      </div>

      <button id="ofc-start-btn" style="margin-top: 10px;">Start Fact Check</button>
    </div>
  `;
  attachCloseHandlers();

  // Attach click handler to the start button
  document.getElementById('ofc-start-btn').onclick = () => {
    const config = {
      text: currentSelectedText,
      claim_processor: document.getElementById('ofc-cp').value,
      retriever: document.getElementById('ofc-rtv').value,
      verifier: document.getElementById('ofc-vfr').value
    };
    // Send config to background script to start the check
    chrome.runtime.sendMessage({ action: "START_CHECK", config: config });
  };
}

// --- 2. LOADING SCREEN ---
// Updated to accept 'selectedText' so we can show it
function showLoadingUI(selectedText) {
  const root = ensureRootExists();
  root.innerHTML = `
    ${createHeader()}
    <div id="ofc-body">
      <div class="ofc-section-label" style="margin-top: 0;">Analysing Selection</div>
      <div class="ofc-context-preview">"${selectedText.substring(0, 120)}${selectedText.length > 120 ? '...' : ''}"</div>

      <div class="ofc-loading-container">
        <div class="ofc-spinner"></div>
        <div style="font-weight: 600; font-size: 15px;">Verifying facts...</div>
        <div style="opacity: 0.7; margin-top: 6px; font-size: 12px;">Running custom pipeline</div>
      </div>
    </div>
  `;
  attachCloseHandlers();
}

// --- 3. RESULT SCREEN ---
function updateUIWithResult(data) {
  const root = ensureRootExists();
  console.log("[OpenFactCheck] API Response:", data);

  let rawLabel = data.overall_label;
  let isTrue = rawLabel === true || rawLabel === "True" || rawLabel === "true" || rawLabel === 1;
  let verdictClass = isTrue ? "ofc-verdict-true" : "ofc-verdict-false";
  let verdictIcon = isTrue ? "✅" : "⚠️";
  let verdictText = isTrue ? "Factually Accurate" : "Potential Inaccuracy Detected";

  const mainDetail = data.verification_details && data.verification_details.length > 0
    ? data.verification_details[0]
    : { reasoning: "No detailed reasoning provided.", correction: null };

  let showCorrection = mainDetail.correction &&
                       mainDetail.correction.toLowerCase() !== "none" &&
                       mainDetail.correction.trim() !== "";

  root.innerHTML = `
    ${createHeader()}
    <div class="ofc-verdict-banner ${verdictClass}">
      <span style="font-size: 18px;">${verdictIcon}</span> ${verdictText}
    </div>
    <div id="ofc-body">
      ${showCorrection ? `
        <div class="ofc-section-label" style="color: #166534;">Suggested Correction</div>
        <div class="ofc-detail-box ofc-correction-box">
          <strong>${mainDetail.correction}</strong>
        </div>
      ` : ''}

      <div class="ofc-section-label">Analysis & Reasoning</div>
      <div class="ofc-detail-box">
        ${mainDetail.reasoning}
      </div>

      ${renderEvidences(data.evidences)}
    </div>
  `;
  attachCloseHandlers();
}

function renderEvidences(evidences) {
  if (!evidences || Object.keys(evidences).length === 0) return '';
  let evidenceCardsHTML = '';
  for (const [claim, evidenceList] of Object.entries(evidences)) {
     evidenceList.forEach(ev => {
       let source = "General Context";
       let text = ev;
       if (Array.isArray(ev) && ev.length >= 2) {
         source = ev[0].replace(/\?$/, '');
         text = ev[1];
       }
       evidenceCardsHTML += `
         <div class="ofc-evidence-card">
           <div class="ofc-evidence-source">${source}</div>
           <div>${text}</div>
         </div>
       `;
     });
  }
  return `<div class="ofc-section-label">Supporting Evidence</div><div class="ofc-evidence-list">${evidenceCardsHTML}</div>`;
}

function showErrorUI(errorMessage) {
  const root = ensureRootExists();
  root.innerHTML = `
    ${createHeader()}
    <div class="ofc-verdict-banner ofc-verdict-error"><span style="font-size: 18px;">🔧</span> System Error</div>
    <div id="ofc-body">
      <div class="ofc-section-label">Error Details</div>
      <div class="ofc-detail-box" style="color: #9f1239; background: #fff1f2; border-color: #fecdd3;">${errorMessage || "Lost connection to local server."}</div>
    </div>
  `;
  attachCloseHandlers();
}
