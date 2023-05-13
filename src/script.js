apiKey = "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";

var language;
if (typeof jest === "undefined") { // exclude this block when running Jest tests

  // Default language is Afrikaans
chrome.storage.sync.set({'language': 'Afrikaans'}, function() {
  console.log('Language set to Afrikaans.');
});


  // Read the language from storage and store it in the global variable
  chrome.storage.sync.get(['language'], function(items) {
    language = items.language;
    console.log("Language: " + language);
  });
  // Listen for changes to the "language" key
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'sync' && changes.language) {
      language = changes.language.newValue;
      console.log('Language updated to ' + language);
    }
  });
}


// Function connects to OpenAI API and returns a synonym for the word passed in
async function requestSynonym(word) {
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
    ,{role: "user", content:`Provide me with a synonym of "${word}".`}],
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
async function requestAntonym(word) {
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
      ,{role: "user", content:`Provide me with a antonnym of "${word}".`}],
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
async function requestDefinition(word) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
       {role: "system", content: "You are the oxford dictionary."}
      ,{role: "user", content:`Provide me with a definition of "${word}".`}],
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
async function requestExampleSentence(word) {
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
     {role: "system", content: "You are the oxford dictionary."}
    ,{role: "user", content:`Provide me with an example sentence containing "${word}".`}],
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



