let randomNum = Math.floor(Math.random() * 100 + 1);
const guessBox = document.querySelector("#guessBox");
let guessCount = 1;
let turns = document.querySelector(".turns");
let guesses = document.querySelector(".guesses");
let result = document.querySelector(".result");
let hint = document.querySelector(".hint");
let restartButton = document.querySelector(".restartButton");
const submitButton = document.querySelector(".submitButton");

guessBox.focus();

function checkGuess() {

    let userGuess = Number(document.querySelector("#guessBox").value);
    hint.style.display = "block";
    

    // If user guesses a non-number
    if (isNaN(userGuess)) {
        event.preventDefault();
        hint.classList.add("wrong");       
        hint.textContent = "Please enter a number from 1-100 inclusive."
    
    // If user guess an ineligible number 
    } else if (userGuess < 1 || userGuess > 100) {
        event.preventDefault();
        hint.classList.add("wrong");
        hint.textContent = "Please enter a number from 1-100 inclusive."

    } else {
        // If user guesses an eligible number
        event.preventDefault();

        if (guessCount === 1) {
            guesses.textContent = "Previous Guesses: ";
        }
        
        // Turn on previous guesses div 
        guesses.style.display = "block";
        guesses.textContent += userGuess + " ";        
        
        // If user guesses the number
        if (userGuess === randomNum){
            hint.textContent = "Woohoo! You won! Here is your internet prize <3";
            hint.classList.remove("wrong");
            hint.classList.add("correct");
            gameOver();   
            
        // If user takes more than 10 tries to guess  
        } else if (guessCount === 10) {
            hint.textContent = "Game Over :( Try again?";
            gameOver(); 

        // If user guesses wrong but has had less than 10 tries
        } else {
            hint.classList.add("wrong");      
            if (userGuess > randomNum) {                
                hint.textContent = "Try a lower number.";
            } else if (userGuess < randomNum) {
                hint.textContent = "Try a higher number.";
            } 
        }

        // Indicate how many turns are left
        turns.textContent = 10 - guessCount;

        guessCount++;
        
    }

    guessBox.value = "";
    guessBox.focus();
}

function gameOver() {

    // Show Restart button 
    restartButton.style.visibility = "visible";
    
    // Disable fields
    guessBox.disabled = true;
    submitButton.disabled = true;
    submitButton.style.cursor = "default";

}

function restartGame() {

    // Hide Restart button 
    restartButton.style.visibility = "hidden";

    // Re-enable guess fields and submit button
    guessBox.disabled = false;  
    submitButton.disabled = false;
    submitButton.style.cursor = "pointer";

    // Resets result, hint and guess fields
    document.querySelectorAll(".reset").forEach(element => element.textContent = "");

    // Hide hint and guess fields
    hint.style.display = "none";
    hint.classList.remove("wrong", "correct");
    guesses.style.display = "none";

    // Reset counter
    guessCount = 1;
    turns.textContent = 10

    // Generate new random number 
    randomNum = Math.floor(Math.random() * 99 + 1);

    guessBox.focus();
}