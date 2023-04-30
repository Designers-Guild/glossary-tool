const { requestSynonym,requestT ,requestAntonym,requestDefinition,requestExampleSentence,requestHomonym} = require('./script.js');

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
        // Add the word , the synonym and the antonym to the popup
         let synonym = await requestSynonym(clickedWord);
         let t = await requestT(clickedWord);
         let antonym = await requestAntonym(clickedWord);
         let definition=await requestDefinition(clickedWord);
         let examplesentence = await requestExampleSentence(clickedWord);
         let homonym=await requestHomonym(clickedWord);
         let content = document.createElement("div");
         
        content.innerHTML = clickedWord + "<br>" +"<br>"+ "SYNONYM: " + synonym +"<br>" +"TRANSLATION: " + t + "<br>" + "ANTONYM: " + antonym + "<br>" + "DEFINITION: " + definition  + "<br>" + "EXAMPLE SENTENCE: " + examplesentence + "<br>" + "HOMONYM: " + homonym;
        popup.replaceChild(content, spinner);
  
      }
  
      //if the user double clicks an empty space (nothing)
      else if(clickedWord ==""){
      } 

      // Replace the spinner with the word and synonym
  
  //Set current popup of current double clicked word to previous popup
   prevPopup = popup;
});
