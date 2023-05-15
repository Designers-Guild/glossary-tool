var backgroundColor, textColor;

// Get the root element of the document
var root = document.documentElement;
// Set the value of the --bg-color variable to default
root.style.setProperty('--bg-color', '#7983ff');
root.style.setProperty('--text-color', '#444444');


// Read the colour from storage and store it in the global variable
chrome.storage.sync.get(['backgroundColor'], function(items) {
    backgroundColor = items.backgroundColor;
  if (typeof backgroundColor === "undefined") {
  // Default colour is "default"
  chrome.storage.sync.set({'backgroundColor': '#6b9fc4'}, function() {
  console.log('Colour set to Default.');
  backgroundColor = '#6b9fc4';
  });
  }
  else {
  root.style.setProperty('--bg-color', backgroundColor.toString());
  console.log('Colour: ' + backgroundColor);
  }
  });
  
   // Read the text color from storage and store it in the global variable
   chrome.storage.sync.get(['textColor'], function(items) {
    textColor = items.textColor;
    if (typeof textColor === "undefined") {
      // Default text color is black
      chrome.storage.sync.set({'textColor': '#444444'}, function() {
        console.log('Text color set to Default.');
        textColor = '#444444';
      });
    }
    else {
      root.style.setProperty('--text-color', textColor.toString());
      console.log('Text color: ' + textColor);
    }
  });
  
// Listen for changes to the "colour" key
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'sync' && changes.backgroundColor) {
      backgroundColor = changes.backgroundColor.newValue;
    root.style.setProperty('--bg-color', backgroundColor.toString());
    console.log('Colour updated to ' + backgroundColor);
    }
    });
    
    // Listen for changes to the "colour" key
    chrome.storage.onChanged.addListener(function(changes, areaName) {
      if (areaName === 'sync' && changes.textColor) {
        textColor = changes.textColor.newValue;
      root.style.setProperty('--text-color', textColor.toString());
      console.log('Colour updated to ' + textColor);
      }
      });  