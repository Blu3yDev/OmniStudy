chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "displayResult") {
    const resultDiv = document.createElement("div");
    resultDiv.style = `
      position:fixed;top:20px;right:20px;width:320px;max-height:400px;
      overflow:auto;background:white;box-shadow:0 0 12px rgba(0,0,0,0.2);
      border-radius:8px;padding:15px;font-family:sans-serif;z-index:999999;
    `;
    resultDiv.innerHTML = `
      <strong>StuHelper Result:</strong>
      <p>${request.result}</p>
      <button style="margin-top:10px;" id="closeStuHelper">Close</button>
    `;
    document.body.appendChild(resultDiv);
    document.getElementById("closeStuHelper").onclick = () => resultDiv.remove();
  }
});
