const { requestSynonym,requestTranslation ,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage} = require('./script.js');

//Set prevPop to null, initially when theres no popups on page
let prevPopup=null; 

let imageCreated = false;

// Event listener for double click on a word and creates the popup
document.addEventListener("dblclick", async(event)=> {
// Use the selected language in your script
    //Remove the previous pop if we find one is already open, ie
    //PrevPopup is not null anymore
    if (prevPopup) {
      prevPopup.remove();
    }

    // Get the word that was clicked
    let clickedWord= window.getSelection().toString().trim();
    console.log(clickedWord);
    
    // Create the popup and spinner elements
    let popup = document.createElement("div");
    popup.classList.add("popup");

    let spinner = document.createElement("div");
    spinner.classList.add("spinner");

      //checks that the user does not double click nothing
      if(clickedWord != ""){
            // Add the spinner to the popup
    popup.appendChild(spinner);
  
    // Set the popup position
   popup.style.top = event.pageY + "px";
   popup.style.left = event.pageX + "px";

   
 
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

// Add an image button to the popup
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

document.body.appendChild(popup);

prevPopup = popup;

         let content = document.createElement("div");

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
