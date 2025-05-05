chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize Text",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "simplify",
    title: "Simplify Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const actionType = info.menuItemId;
  const selectedText = info.selectionText;

  const { gradeLevel = "6", simplicity = "Medium" } = await chrome.storage.sync.get(["gradeLevel", "simplicity"]);

  const response = await fetch(`https://your-api-domain.com/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: selectedText,
      action: actionType,
      grade: gradeLevel,
      simplicity: simplicity
    })
  });

  const result = await response.json();
  chrome.tabs.sendMessage(tab.id, { action: "displayResult", result: result.data });
});
