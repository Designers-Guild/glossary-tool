const { requestSynonym,requestTranslation ,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym, createImage} = require('./script.js');

//Set prevPop to null, initially when theres no popups on page
let prevPopup=null; 

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
  let closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
  popup.remove();
});

popup.appendChild(closeButton);

document.body.appendChild(popup);

prevPopup = popup;

         let content = document.createElement("div");

         let word = document.createElement("div");
         word.innerText = clickedWord;
         word.classList.add("popup-word");
         content.appendChild(word);
         
         let synonym = document.createElement("div");
         synonym.innerHTML = `<span class="bold-text">Synonym:</span> ${await requestSynonym(clickedWord)}`;
         synonym.classList.add("popup-synonym");
         content.appendChild(synonym);
         
         let antonym = document.createElement("div");
         antonym.innerHTML = `<span class="bold-text">Antonym:</span> ${await requestAntonym(clickedWord)}`;
         antonym.classList.add("popup-antonym");
         content.appendChild(antonym);
         
         let definition = document.createElement("div");
         definition.innerHTML = `<span class="bold-text">Definition:</span> ${await requestDefinition(clickedWord)}`;
         definition.classList.add("popup-definition");
         content.appendChild(definition);

         let examplesentence = document.createElement("div");
         examplesentence.innerHTML = `<span class="bold-text">Example Sentence:</span> ${await requestExampleSentence(clickedWord)}`;
         examplesentence.classList.add("popup-example");
         content.appendChild(examplesentence);
         
         let homonym = document.createElement("div");
         homonym.innerHTML = `<span class="bold-text">Homonym:</span> ${await requestHomonym(clickedWord)}`;
         homonym.classList.add("popup-homonym");
         content.appendChild(homonym);
         
         let translation = document.createElement("div");
         translation.innerHTML = `<span class="bold-text">Translation:</span> ${await requestTranslation(clickedWord)}`;
         translation.classList.add("popup-translation");
         content.appendChild(translation);

         let img = document.createElement("img"); 
         img.src = await createImage(clickedWord); 
         content.appendChild(img);
         
         popup.replaceChild(content, spinner);

  
      }
  
      //if the user double clicks an empty space (nothing)
      else if(clickedWord ==""){
      } 

      // Replace the spinner with the word and synonym
  
  //Set current popup of current double clicked word to previous popup
   prevPopup = popup;
});
