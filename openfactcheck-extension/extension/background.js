// 1. Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ofc-verify",
    title: "Verify with OpenFactCheck",
    contexts: ["selection"]
  });
});

// 2. Handle the initial right-click event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ofc-verify" && info.selectionText) {
    // Instead of starting the check immediately, we tell content.js to show the config screen.
    chrome.tabs.sendMessage(tab.id, {
      action: "SHOW_CONFIG",
      text: info.selectionText
    });
  }
});

// 3. Listen for messages from content.js (specifically the "START_CHECK" action)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_CHECK") {
    const tabId = sender.tab.id;

    // Immediately show the loading state in the UI while we wait for the server
    chrome.tabs.sendMessage(tabId, { action: "SHOW_LOADING", text: message.config.text });

    // Make the API call to your local Python server
    fetch("http://127.0.0.1:8000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We send the entire config object received from content.js,
      // which includes text, claim_processor, retriever, and verifier.
      body: JSON.stringify(message.config)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.detail || `Server error: ${response.status}`);
            }).catch(() => {
                throw new Error(`Server error: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
      // Check if the server explicitly reported success
      if (data && data.status === "success") {
        chrome.tabs.sendMessage(tabId, {
          action: "SHOW_RESULT",
          data: data
        });
      } else {
        throw new Error(data.detail || "Invalid response format from server");
      }
    })
    .catch(error => {
      console.error("OpenFactCheck API Error:", error);
      // Send the error message back to the UI to be displayed to the user
      chrome.tabs.sendMessage(tabId, {
        action: "SHOW_ERROR",
        error: error.message
      });
    });
  }
});
