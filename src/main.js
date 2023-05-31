const { requestSynonym,requestTranslation ,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage, GetWikiLink, requestPhrase, requestAbbreviation} = require('./script.js');

  //button to click to play audio// sends to assembly api
  function createPlayButton(word) {
    var playButton = document.createElement("button");
    playButton.textContent = "▶";
    playButton.classList.add("playButton");
    playButton.addEventListener("click", async function() {
      if ('speechSynthesis' in window) {
        await waitForVoicesReady(); // Wait for the voices to be loaded
        
        var utterance = new SpeechSynthesisUtterance(word);
        speechSynthesis.speak(utterance);
      } else {
        console.error("Speech synthesis is not supported in this browser.");
      }
    });
    return playButton;
  }
  
  //improve audio quality
  async function waitForVoicesReady() {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window && speechSynthesis.getVoices().length !== 0) {
        resolve();
      } else {
        speechSynthesis.onvoiceschanged = function() {
          resolve();
          speechSynthesis.onvoiceschanged = null; // Clean up the event listener
        };
      }
    });
  }

  var language;
// Read the language from storage and store it in the global variable
chrome.storage.sync.get(['language'], function(items) {
  language = items.language;
  if (typeof language === "undefined") {
  // Default language is Afrikaans
  chrome.storage.sync.set({'language': 'Afrikaans'}, function() {
  language = 'Afrikaans';
  });
  }
  else {
  }
  });
  
  
  // Listen for changes to the "language" key
  chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'sync' && changes.language) {
  language = changes.language.newValue;
  }
  });
  
//Set prevPop to null, initially when theres no popups on page
let prevPopup=null; 

let imageCreated = false;
let videoCreated = false;


// Event listener for double click on a word and creates the popup

document.addEventListener("dblclick", async (event) => {
  // Remove the previous popup if we find one is already open
  if (prevPopup) {
    prevPopup.remove();
  }

  // Get the word that was clicked
  let clickedWord = window.getSelection().toString().trim();
  console.log("Clicked Word: " + clickedWord);

  // Get the text content of the clicked element
  let clickedElement = event.target;
  let textContent = clickedElement.textContent;

  // Remove punctuation from the textContent
  let cleanedText = textContent.replace(/[^\w\s]/g, ''); // Removes all punctuation marks
  //console.log("Cleaned Text: " + cleanedText);

  // Split the cleaned text into an array of words, converting to lowercase
  let words = cleanedText.toLowerCase().split(" ");
  //console.log("Words: ", words);

  // Find the index of the clicked word, converting to lowercase
  let index = words.indexOf(clickedWord.toLowerCase());
  //console.log("Index of Word: " + index);

  // Extract the 10 words before and after the clicked word
  let start = Math.max(0, index - 20);
  let end = Math.min(words.length - 1, index + 20);
  let contextWords = words.slice(start, end + 1);

  // Join the context words back into a string
  let contextString = contextWords.join(" ");

  // Log the context string for testing
  console.log(contextString);

  // Create the popup and spinner elements
  let popup = document.createElement("div");
  popup.classList.add("popup");

  let spinner = document.createElement("div");
  spinner.classList.add("spinner");

  // Checks that the user does not double click nothing
  if (clickedWord !== "") {
    // Add the spinner to the popup
    popup.appendChild(spinner);

    // Set the popup position
    popup.style.top = event.pageY + "px";
    popup.style.left = event.pageX + "px";

    //move cursor
    // Make the popup draggable
    let isDragging = false;

    //move cursor
    // Function to handle the drag start event
    const dragStart = (e) => {
      e.preventDefault();
      isDragging = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
    };

    //move cursor
    // Function to handle the drag event
    const drag = (e) => {
      e.preventDefault();
      if (isDragging) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        popup.style.top = popup.offsetTop - pos2 + "px";
        popup.style.left = popup.offsetLeft - pos1 + "px";
      }
    };

    //move cursor
    // Function to handle the drag end event
    const dragEnd = (e) => {
      e.preventDefault();
      isDragging = false;
    };

    //move cursor
    // Attach the drag events to the popup header
    let popupMover = document.createElement("div");
    popupMover.textContent = "➕";
    popupMover.classList.add("popupMover");
    popup.appendChild(popupMover);

    popupMover.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);


     // Add a close button to the popup
    let closeButton = document.createElement("button");
    closeButton.textContent = "✖️";
    closeButton.classList.add("closeButton");
    popup.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
    popup.remove();
});



// Check if the div with class "App" exists
let appDiv = document.querySelector("div#App");

if (appDiv) {
  // Add the popup to the "App" div
  appDiv.appendChild(popup);
} else {
  // Add the popup to the body
  document.body.appendChild(popup);
}

prevPopup = popup;

         let content = document.createElement("div");

         //ASSEMBLY Requests
         //add the play button to the popup. Since it uses its own api, async functions, it need not be at the bottom
         let bb = createPlayButton(clickedWord);
         content.appendChild(bb);

         //CHATGPT Requests
         const [synonym, antonym, definition, ExampleSentence, Homonym, Translation, Image, Video, abbreviation ] = await Promise.all([
          requestSynonym(clickedWord,contextString),
          requestAntonym(clickedWord,contextString),
          requestDefinition(clickedWord,contextString),
          requestExampleSentence(clickedWord,contextString),
          requestHomonym(clickedWord),
          requestTranslation(clickedWord,language),
          createImage(clickedWord),
          requestPhrase(clickedWord,contextString),
          requestAbbreviation(clickedWord),
        ]);
        
        let word = document.createElement("div");
        word.innerText = clickedWord;
        word.classList.add("popup-word");
        content.appendChild(word);
        
        let synonymDiv = document.createElement("div");
        synonymDiv.innerHTML = `<span class="bold-text">Synonym:</span> ${synonym}`;
        synonymDiv.classList.add("popup-synonym");
        content.appendChild(synonymDiv);
        
        let antonymDiv = document.createElement("div");
        antonymDiv.innerHTML = `<span class="bold-text">Antonym:</span> ${antonym}`;
        antonymDiv.classList.add("popup-antonym");
        content.appendChild(antonymDiv);
        

         let homonym = document.createElement("div");
         homonym.innerHTML = `<span class="bold-text">Homonym:</span> ${Homonym}`;
         homonym.classList.add("popup-homonym");
         content.appendChild(homonym);

         let Abbreviation = document.createElement("div");
         Abbreviation.innerHTML = `<span class="bold-text">Abbreviation:</span> ${abbreviation}`;
         Abbreviation.classList.add("popup-abbreviation");
         content.appendChild(Abbreviation);

         let translation = document.createElement("div");
         translation.innerHTML = `<span class="bold-text">Translation:</span> ${Translation}`;
         translation.classList.add("popup-translation");
         content.appendChild(translation);

         
         let definitionDiv = document.createElement("div");
         definitionDiv.innerHTML = `<span class="bold-text">Definition:</span> ${definition}`;
         definitionDiv.classList.add("popup-definition");
         content.appendChild(definitionDiv);
 
          let examplesentence = document.createElement("div");
          examplesentence.innerHTML = `<span class="bold-text">Example Sentence:</span> ${ExampleSentence}`;
          examplesentence.classList.add("popup-example");
          content.appendChild(examplesentence);
          
          const image = document.createElement('div');
          image.classList.add('popup-img');
          popup.insertBefore(image, popup.firstChild);

          let vid; //make them global to use in below click requests
          let img;

          let imageButton = document.createElement("button");
          imageButton.classList.add("imageButton");
          let icon = document.createElement("img");
          icon.src = "https://cdn-icons-png.flaticon.com/512/223/223117.png";
          imageButton.appendChild(icon);
          imageButton.addEventListener("click", async() => {
            if (!imageCreated) {
              img = document.createElement("img"); 
              img.src = Image; 
              img.classList.add("created-img");
              if(videoCreated){ //line 226 to 231 ---> if theres a video, replace video element otherwise replace image placeholder
                popup.removeChild(vid);
              }
              else{
                popup.removeChild(image);
              }
              popup.insertBefore(img, popup.firstChild);
              imageCreated = true;
              videoCreated = false; //when clicking image, set video to false, indicating no video created so we can click to see a video ( ie the video function can be rerun)
            } else {
              img = content.querySelector("img");
            }
          });
          popup.appendChild(imageButton);
          imageCreated = false; // allows so that we can reclick image button to see image all, in the same browser state ( ie before refreshing), if we close the popup adn reopen it again for aniother request
          
          //Refresh image button logic 
          let refreshButton = document.createElement("button");
          refreshButton.classList.add("refreshButton");
          let iconRefresh = document.createElement("img");
          iconRefresh.src = "https://cdn-icons-png.flaticon.com/512/159/159612.png";
          refreshButton.appendChild(iconRefresh);

          refreshButton.addEventListener("click",async() =>{
            //only refresh if an image exists and video does not exist
            if(imageCreated && !videoCreated)
            {
              imageCreated = false;
              //TO spin the icon 
              refreshButton.classList.add("refreshspin");

              const newImage = await createImage(clickedWord);
                //We have to remove the existing img and then create new img element       
                if (img && img.parentNode) {
                  img.parentNode.removeChild(img);
                }
                // Create a new img element and set its attributes
                img = document.createElement("img");
                img.src = newImage;
                img.classList.add("created-img");

              // Wait for the new image to load
              await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              });

              //Remove spinner when image loaded
              refreshButton.classList.remove("refreshspin");
                // Insert the new img element at the appropriate position
                popup.insertBefore(img, popup.firstChild);
                imageCreated = true;
                videoCreated = false; //when clicking image, set video to false, indicating no video created so we can click to see a video ( ie the video function can be rerun)
            }
          });
          popup.appendChild(refreshButton);
          imageCreated = false;

          let videoButton = document.createElement("button");
          videoButton.classList.add("videoButton");
          let icon2 = document.createElement("img");
          icon2.src = 'https://cdn-icons-png.flaticon.com/512/3698/3698647.png';

          videoButton.appendChild(icon2);
          videoButton.addEventListener("click", async() => {
            if (!videoCreated) {
              vid = document.createElement("video");
              vid.src = Video;
              vid.controls = true; //allow to see video controls like pause, 3 line button etc.
              vid.autoplay = true; //autoplays video upon clicking
              vid.classList.add("created-vid");
              if(imageCreated){  //line 255 - 261 ---> if theres a image, replace image element otherwise replace image placeholder
                popup.removeChild(img);
                
              }
              else{
                popup.removeChild(image);
              }
              popup.insertBefore(vid, popup.firstChild); // Insert the video before the image container
              videoCreated = true;
              imageCreated = false; //when clicking on video, set image to falase so we can click image again
            } else {
              vid = content.querySelector("video");
            }
          });
          popup.appendChild(videoButton);
          videoCreated = false; // allows so that we can reclick video button to see video, in the same browser state ( ie before refreshing), if we close the popup adn reopen it again for aniother request
          
          //LINK Request
         //Creating More info link inside popup
         var linkButton = document.createElement("a");
         linkButton.textContent = "🔗";
         linkButton.classList.add("linkButton");
         linkButton.href = GetWikiLink(clickedWord)
         linkButton.target = "blank";
         linkButton.rel ="noopener noreferrer"
         popup.appendChild(linkButton);


         popup.replaceChild(content, spinner);

  
      }
  
      //if the user double clicks an empty space (nothing)
      else if(clickedWord ==""){
      } 

      // Replace the spinner with the word and synonym
  
  //Set current popup of current double clicked word to previous popup
   prevPopup = popup;
});
