apiKey = "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";



var language,backgroundColor, textColor;
if (typeof jest === "undefined") { // exclude this block when running Jest tests
  
// Get the root element of the document
var root = document.documentElement;
// Set the value of the --bg-color variable to default
root.style.setProperty('--bg-color', '#7983ff');
root.style.setProperty('--text-color', '#444444');

// Read the language from storage and store it in the global variable
chrome.storage.sync.get(['language'], function(items) {
language = items.language;
if (typeof language === "undefined") {
// Default language is Afrikaans
chrome.storage.sync.set({'language': 'Afrikaans'}, function() {
console.log('Language set to Afrikaans.');
language = 'Afrikaans';
});
}
else {
console.log("Language: " + language);
}
});

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

// Listen for changes to the "language" key
chrome.storage.onChanged.addListener(function(changes, areaName) {
if (areaName === 'sync' && changes.language) {
language = changes.language.newValue;
console.log('Language updated to ' + language);
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
}

// Function connects to OpenAI API and returns a synonym for the word passed in
async function requestSynonym(word,context) {
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "From now on, I only want single word answers."},
     {role: "system", content: "You are the oxford dictionary."}
    ,{role: "user", content:`Provide me with a synonym of "${word}". Note that the word is used in this context: "${context}".`}],
  }),
};

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
    const data = await response.json();
    const content = data.choices[0].message.content;
    return content;
  } catch (error) {
    return "Please try again";
  }
  
}
// Function connects to OpenAI API and returns a Translation for the word passed in
async function requestTranslation(word) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content: "From now on, I only want single word answers."},
       {role: "system", content: `You are a Helpul assistant that translates english to "${language}".`}
      ,{role: "user", content:`Provide me with a Translation of "${word}" to "${language}".`}],
    }),
  };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const data = await response.json();
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      return "Please try again";
    }
    
  }

// Function connects to OpenAI API and returns a Antnonym for the word passed in
async function requestAntonym(word,context) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content: "From now on, I only want single word answers."},
       {role: "system", content: "You are the oxford dictionary."}
      ,{role: "user", content:`Provide me with a antonnym of "${word}". Note that the word is used in this context: "${context}"`}],
    }),
  };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const data = await response.json();
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      return "Please try again";
    }
    
  }

// Function connects to OpenAI API and returns a definition  for the word passed in
async function requestDefinition(word,context) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
       {role: "system", content: "You are the oxford dictionary. Provide a simple defintion only. If the context is insufficient, provide any simple,general defnition of the word."}
      ,{role: "user", content:`Provide me with a simple definition of "${word}". Note that the word is used in this context: "${context}"`}],
    }),
  };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const data = await response.json();
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      return "Please try again";
    }
    
  }

  // Function connects to OpenAI API and returns an example sentence for the word passed in
async function requestExampleSentence(word,context) {
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
     {role: "system", content: "You are a simple-example-sentence-generator. Provide an example sentence only. Do not use the same context for the sentence."}
    ,{role: "user", content:`Provide me with a simple example sentence containing "${word}". Note that the word is used in this context: "${context}".`}],
  }),
};

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
    const data = await response.json();
    const content = data.choices[0].message.content;
    return content;
  } catch (error) {
    return "Please try again";
  }
  
}

// Function connects to OpenAI API and returns a Homonym  for the word passed in
async function requestHomonym(word) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content: "From now on, I only want single word answers."},
       {role: "system", content: "You are the oxford dictionary."}
      ,{role: "user", content:`Provide me with a homonym of "${word}".`}],
    }),
  };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const data = await response.json();
      const content = data.choices[0].message.content;
      return content;
    } catch (error) {
      return "Please try again";
    }
    
  }

  async function createImage(word) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        'model': 'image-alpha-001',
        'prompt': word,
        'num_images': 1,
        'size':  '256x256'
      }),
    };
    
      try {
        const response = await fetch("https://api.openai.com/v1/images/generations", requestOptions);
        const data = await response.json();
        const url = data.data[0].url;
        return url;
      } catch (error) {
        return "Please try again";
      }
      
    }

  //Making a wiki link for the word
function GetWikiLink(word) {
  var encodedWord = encodeURIComponent(word);
  var wikiLink = `https://en.wikipedia.org/wiki/${encodedWord}`;
  return wikiLink
}


  
module.exports = { requestSynonym,requestTranslation,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage,GetWikiLink};



