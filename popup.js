document.getElementById('saveSettings').addEventListener('click', () => {
  const gradeLevel = document.getElementById('gradeLevel').value;
  const simplicity = document.getElementById('simplicity').value;

  chrome.storage.sync.set({ gradeLevel, simplicity }, () => {
    alert('Settings Saved!');
  });
});

// Load saved settings on popup open
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['gradeLevel', 'simplicity'], (data) => {
    if (data.gradeLevel) document.getElementById('gradeLevel').value = data.gradeLevel;
    if (data.simplicity) document.getElementById('simplicity').value = data.simplicity;
  });
});
