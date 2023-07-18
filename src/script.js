apiKey = "sks-fiY6pQ1k1Hx08yL0NiOAT3BlbkFJ73gxuHYrzKKKWS4N3TpS";
apiKeyp = 'JUt5mkVtvrMrDEBFw0NUPzmqIsbpoL35rasOV6M4PHMgUn7sdEWpDsiO';




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
    return "Please try again" ;
  }
  
}
// Function connects to OpenAI API and returns a Translation for the word passed in
async function requestTranslation(word, language) {
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

// Function connects to OpenAI API and returns a homonym  for the word passed in
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

  // Function connects to OpenAI API and returns an abbreviation for the word passed in
  async function requestAbbreviation(word) {
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
        ,{role: "user", content:`Provide me with an abbreviation of "${word}". If there is no valid abbreviation provide me a common texting abbreviation`}],
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

 // Function connects to OpenAI API and returns a 2phrase for the word passed in
 async function requestPhrase(word,context) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
      { role: 'system', content: `Only provide a 2 word phrase. Please provide a phrase that uses the word "${word}" that is relevant to the context of the passage "${context}".` },
      /* { role: 'system', content: `Please generate a phrase up to a maximum of 3 words (minimum 1 word phrase) to pass into pexels to get a picture of the word "${word}" in the context of "${context}". The phrase MUST contain the word "${word}".` }, */
      ],
    }),
  };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const data = await response.json();
      const content = data.choices[0].message.content;
      console.log(content); //JUST WANNA SEE WHATS THE PHRASE
      // Pass the generated word into the Pexels async function
      const videoUrl = await getPexelsVideo(content);
      // Display the video in the browser
      return videoUrl;
    } catch (error) {
      return "Please try again";
    }
    
  }

    // Define the Pexels async function
    async function getPexelsVideo(searchQuery) {
      // Set the API endpoint and headers for the Pexels API
      const pexelsUrl = 'https://api.pexels.com/videos/search';
      const pexelsHeaders = new Headers({
        'Authorization': apiKeyp,
      });

      // Set the parameters for the search query
      const params = new URLSearchParams({
        'query': searchQuery,
        'per_page': 1,
      });

      // Construct the complete URL with query parameters
      const requestUrl = `${pexelsUrl}?${params.toString()}`;

      try {
        // Make the Pexels API request
        const response = await fetch(requestUrl, { headers: pexelsHeaders });
        const data = await response.json();

        // Handle the Pexels API response
        const videos = data.videos;
        if (videos.length > 0) {
          // Access the video URL
          const videoUrl = videos[0].video_files[0].link;
          console.log('Video URL:', videoUrl);
          return videoUrl; // Return the video URL
        } else {
          console.log('No videos found for the search query.');
          return null; // Return null if no videos found
        }
      } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return null; // Return null in case of error
      }
    }



module.exports = { requestSynonym,requestTranslation,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage,GetWikiLink, requestPhrase,requestAbbreviation};



