document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById('language');
    const saveButton = document.getElementById('save-button');
    const backgroundColorDropdown = document.getElementById("backgroundColor");

    // Load the saved language preference (if any)
    chrome.storage.sync.get(['language'], function(items) {
      if (items.language) {
        languageSelect.value = items.language;
        console.log(`Selected language: ${languageSelect.value}`);
      }
    });
    chrome.storage.sync.get(['backgroundColor'], function(items) {
      if (items.backgroundColor) {
        backgroundColorDropdown.value = items.backgroundColor;
      }
    });
  
    // Save the selected language when the user clicks the save button
    saveButton.addEventListener('click', function() {
      const selectedLanguage = languageSelect.value;
      const selectedColour = backgroundColorDropdown.value;
      chrome.storage.sync.set({ 'language': selectedLanguage }, function() {
        console.log('Language set to ' + selectedLanguage);
      });
      chrome.storage.sync.set({ 'backgroundColor': selectedColour}, function() {
        console.log('Colour set to ' +selectedColour);
      });
      
      window.close(); // Close the popup window
      
    });
  });
  