document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById('language');
    const saveButton = document.getElementById('save-button');
  
    // Load the saved language preference (if any)
    chrome.storage.sync.get(['language'], function(items) {
      if (items.language) {
        languageSelect.value = items.language;
        console.log(`Selected language: ${languageSelect.value}`);
      }
    });
  
    // Save the selected language when the user clicks the save button
    saveButton.addEventListener('click', function() {
      const selectedLanguage = languageSelect.value;
      chrome.storage.sync.set({ 'language': selectedLanguage }, function() {
        console.log('Language set to ' + selectedLanguage);
      });
      
      window.close(); // Close the popup window
      
    });
  });
  