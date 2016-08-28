
//variables needed for hangman
var words = ["pizza","ramen","spaghetti","meatball","ribs","sausage","tacos","burger","chicken","porkchop","hotdog","bacon","salmon","banana"];
var computerWord = words[Math.floor(Math.random() * words.length)];

var guesses = 15,
	wins = 0,
	losses = 0;

var dashes=[],
	userGuesses=[],
	currentWord =[];

//reset function to start and reset game. Returns all variables to original state
//and produces new word in dashes
function gameReset(){
	computerWord = words[Math.floor(Math.random() * words.length)];
	dashes=[];
	userGuesses = [];
	guesses = 12;

	for (var i = 0; i < computerWord.length; i++) {
		dashes.push("_");
		currentWord = dashes.join(" ");
		document.getElementById("answer").innerHTML = currentWord;
	}
	console.log("New word: " + computerWord);
}

gameReset();

//function performed when a key is pressed
document.onkeyup = function(event){

	var userInput = String.fromCharCode(event.keyCode).toLowerCase();

	//messages to user during gameplay
	document.querySelector('.winner').innerHTML = ('');
	document.querySelector('.loser').innerHTML = ('');
	document.querySelector('.newLetter').innerHTML = ('');

	//looking to see if user input matches in letters in the chosen word and replacing
	//the letter in the corresponding dash
	for (var n = 0; n < computerWord.length; n++) {
		if (computerWord[n] === userInput) {
			dashes[n] = userInput;
			document.getElementById("answer").innerHTML = dashes.join(" ");
			currentWord = dashes.join("")
		}
	}

	//function to check if letter pressed is an actual letter 
	//check if letter was already pressed
	//check if user wins if the computer word and the guessed word match
	//check if user has ran out of guesses
	//decrease guesses if user guess is incorrect and push userGuesses into an array
	function gamePlay(value) {
	var letterCheck  = /^[a-z]+$/;
		if (letterCheck.test(value) == false) {
			console.log("Only input a letter from A through Z");
		}
		else if (userGuesses.indexOf(userInput) != -1) {
					document.querySelector('.wrong').play()
	          		document.querySelector('.newLetter').innerHTML = ("You picked this letter already");
	          	}  
	          	else if(computerWord == currentWord) {
	          		wins++;
	          		document.querySelector('.win').play()
	          		document.querySelector('.winner').innerHTML = ("YOU WIN. NOM NOM NOM on " + computerWord);
		        	gameReset();
		        	console.log("you win");
		        } 
		        else if (guesses == 1) {
		        	losses++;
		        	document.querySelector('.lose').play()
		        	document.querySelector('.loser').innerHTML = ("You don't get to eat any " + computerWord);
		            gameReset();
		        } 
		  		else if (computerWord.indexOf(userInput) == -1){
					guesses--;
		        	userGuesses.push(userInput);
	    		}
	    		else {
	    			userGuesses.push(userInput);
	    		}
	}
    gamePlay(userInput);

    //update html with stats for game as user plays
	var html = 	"<h1>The Hangry Game</h1>" +
				"<p>Press any key to start!</p>" +
				"<p>Wins: " + wins + "</p>" +
				"<p>Losses: " + losses + "</p>" +
				"<p>Guesses left: " + guesses + "</p>" +
				"<p>Your Guesses so far: " + userGuesses + "</p>" 

	document.querySelector(".game").innerHTML = html;
}

