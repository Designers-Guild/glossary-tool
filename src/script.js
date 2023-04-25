apiKey = "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 ";
const chrome = require('sinon-chrome');
//language selected by the user
var language;

// Read the language from storage and store it in the global variable
chrome.storage.sync.get(['language'], function(items) {
  language = items.language;
  console.log("Language: " + language);
});


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
    messages: [{role: "system", content:`You are a dictionary. In your answer, give me a synonym of "${word}".`}],
  }),
};

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
    const data = await response.json();
    const content = data.choices[0].message.content;
    return content;
  } catch (error) {
    return console.log(error);
  }
  
}

module.exports = { requestSynonym};
