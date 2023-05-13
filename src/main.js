const { requestSynonym,requestTranslation ,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage} = require('./script.js');

//Set prevPop to null, initially when theres no popups on page
let prevPopup=null; 

let imageCreated = false;

// Event listener for double click on a word and creates the popup
// Event listener for double click on a word and creates the popup
document.addEventListener("dblclick", async (event) => {
  // Use the selected language in your script
  // Remove the previous popup if we find one is already open
  if (prevPopup) {
    prevPopup.remove();
  }

  // Get the word that was clicked
  let clickedWord = window.getSelection().toString().trim();
  console.log(clickedWord);

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
    let popupHeader = document.createElement("div");
    popupHeader.classList.add("popup-header");
    popupHeader.textContent = "➕";

    popupHeader.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    popup.appendChild(popupHeader);

     // Add a close button to the popup
    let closeButton = document.createElement("closeButton");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", () => {
    popup.remove();
});

//Making a wiki link for the word
function GetWikiLink(word) {
  var encodedWord = encodeURIComponent(word);
  var wikiLink = `https://en.wikipedia.org/wiki/${encodedWord}`;
  return wikiLink
}
popup.appendChild(closeButton);

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

document.body.appendChild(popup);

prevPopup = popup;

         let content = document.createElement("div");

         //add the play button to the popup. Since it uses its own api, async functions, it need not be at the bottom
         let bb = createPlayButton(clickedWord);
         content.appendChild(bb);

         const [synonym, antonym, definition, ExampleSentence, Homonym, Translation, Image ] = await Promise.all([
          requestSynonym(clickedWord),
          requestAntonym(clickedWord),
          requestDefinition(clickedWord),
          requestExampleSentence(clickedWord),
          requestHomonym(clickedWord),
          requestTranslation(clickedWord),
          createImage(clickedWord)
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
        
        let definitionDiv = document.createElement("div");
        definitionDiv.innerHTML = `<span class="bold-text">Definition:</span> ${definition}`;
        definitionDiv.classList.add("popup-definition");
        content.appendChild(definitionDiv);

         let examplesentence = document.createElement("div");
         examplesentence.innerHTML = `<span class="bold-text">Example Sentence:</span> ${ExampleSentence}`;
         examplesentence.classList.add("popup-example");
         content.appendChild(examplesentence);
         
         let homonym = document.createElement("div");
         homonym.innerHTML = `<span class="bold-text">Homonym:</span> ${Homonym}`;
         homonym.classList.add("popup-homonym");
         content.appendChild(homonym);
         
         let translation = document.createElement("div");
         translation.innerHTML = `<span class="bold-text">Translation:</span> ${Translation}`;
         translation.classList.add("popup-translation");
         content.appendChild(translation);

         // Add an image button to the popup
         //the image button appears once the request is successful
          let imageButton = document.createElement("imageButton");
          imageButton.classList.add("imageButton"); // add the "imageButton" class to the button
          let icon = document.createElement("img");
          icon.src = "https://cdn-icons-png.flaticon.com/512/223/223117.png";
          imageButton.appendChild(icon);
          imageButton.addEventListener("click", async() => {
            let img;
            if (!imageCreated) {
              img = document.createElement("img"); 
              img.src = Image; 
              content.appendChild(img);
              imageCreated = true;
            } else {
              img = content.querySelector("img");
            }
          });
          popup.appendChild(imageButton);
          
         //Creating More info link inside popup
         let link = document.createElement("a");
         let linkname = document.createTextNode("More info");
         link.appendChild(linkname);
         link.href = GetWikiLink(clickedWord)
         document.body.appendChild(link);
         link.target = "blank";
         link.rel ="noopener noreferrer"
         content.appendChild(link)

         

         popup.replaceChild(content, spinner);


  
      }
  
      //if the user double clicks an empty space (nothing)
      else if(clickedWord ==""){
      } 

      // Replace the spinner with the word and synonym
  
  //Set current popup of current double clicked word to previous popup
   prevPopup = popup;
});
