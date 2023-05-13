document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById('language');
    const saveButton = document.getElementById('save-button');
    const backgroundColorDropdown = document.getElementById("background-color");

    // Load the saved language preference (if any)
    chrome.storage.sync.get(['language'], function(items) {
      if (items.language) {
        languageSelect.value = items.language;
        console.log(`Selected language: ${languageSelect.value}`);
      }
    });
    chrome.storage.sync.get(['colour'], function(items) {
      if (items.colour) {
        backgroundColorDropdown.value = items.colour;
      }
    });
  
    // Save the selected language when the user clicks the save button
    saveButton.addEventListener('click', function() {
      const selectedLanguage = languageSelect.value;
      const selectedColour = backgroundColorDropdown.value;
      chrome.storage.sync.set({ 'language': selectedLanguage }, function() {
        console.log('Language set to ' + selectedLanguage);
      });
      chrome.storage.sync.set({ 'colour': backgroundColorDropdown.value }, function() {
        console.log('Colour set to ' + backgroundColorDropdown);
      });
      
      window.close(); // Close the popup window
      
    });
  });
  