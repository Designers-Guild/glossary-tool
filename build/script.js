(()=>{var e={495:e=>{apiKey="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",e.exports={requestSynonym:async function(e,t){const o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"From now on, I only want single word answers."},{role:"system",content:"You are the oxford dictionary."},{role:"user",content:`Provide me with a synonym of "${e}". Note that the word is used in this context: "${t}".`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",o);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},requestTranslation:async function(e,t){const o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"From now on, I only want single word answers."},{role:"system",content:`You are a Helpul assistant that translates english to "${t}".`},{role:"user",content:`Provide me with a Translation of "${e}" to "${t}".`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",o);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},requestAntonym:async function(e,t){const o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"From now on, I only want single word answers."},{role:"system",content:"You are the oxford dictionary."},{role:"user",content:`Provide me with a antonnym of "${e}". Note that the word is used in this context: "${t}"`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",o);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},requestDefinition:async function(e,t){const o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You are the oxford dictionary. Provide a simple defintion only. If the context is insufficient, provide any simple,general defnition of the word."},{role:"user",content:`Provide me with a simple definition of "${e}". Note that the word is used in this context: "${t}"`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",o);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},requestExampleSentence:async function(e,t){const o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You are a simple-example-sentence-generator. Provide an example sentence only. Do not use the same context for the sentence."},{role:"user",content:`Provide me with a simple example sentence containing "${e}". Note that the word is used in this context: "${t}".`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",o);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},requestHomonym:async function(e){const t={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"From now on, I only want single word answers."},{role:"system",content:"You are the oxford dictionary."},{role:"user",content:`Provide me with a homonym of "${e}".`}]})};try{const e=await fetch("https://api.openai.com/v1/chat/completions",t);return(await e.json()).choices[0].message.content}catch(e){return"Please try again"}},createImage:async function(e){const t={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model:"image-alpha-001",prompt:e,num_images:1,size:"256x256"})};try{const e=await fetch("https://api.openai.com/v1/images/generations",t);return(await e.json()).data[0].url}catch(e){return"Please try again"}},GetWikiLink:function(e){return`https://en.wikipedia.org/wiki/${encodeURIComponent(e)}`}}}},t={};!function o(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,o),s.exports}(495)})();