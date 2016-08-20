

var words = ["pizza","ramen","spaghetti","meatball","ribs","sausage"];
var computerWord = words[Math.floor(Math.random() * words.length)];

var currentWord =[],
	guesses = 10,
	wins = 0,
	losses = 0;

var dashes=[];
var userGuesses=[];

console.log("Computer chose: " + computerWord);

	for (var i = 0; i < computerWord.length; i++)
		{
			dashes.push("_");
		}
		currentWord = dashes.join(" ");

function gameReset(){
	computerWord = words[Math.floor(Math.random() * words.length)];
	dashes=[];
	userGuesses = [];
	guesses = 10;

	for (var i = 0; i < computerWord.length; i++)
	{
		dashes.push("_");
		currentWord = dashes.join(" ");
		document.getElementById("answer").innerHTML = currentWord;
	}
}


document.onkeyup = function(event){

	var userInput = String.fromCharCode(event.keyCode).toLowerCase();

	console.log(currentWord);

	for (var n = 0; n < computerWord.length; n++) {
		if (computerWord[n] === userInput) {
			dashes[n] = userInput;
			document.getElementById("answer").innerHTML = dashes.join(" ");
			currentWord = dashes.join("")
		}
	}

	function gamePlay(strValue) {
	var letterCheck  = /^[a-z]+$/;
		if (letterCheck.test(strValue) == false) {
			console.log("Only input a letter from A through Z");
		}
		else if (userGuesses.indexOf(userInput) != -1) {
	          		console.log("You already picked this letter. Pick another.");
	          	}  
	          	else if(computerWord == currentWord) {
	          		wins++;
		        	gameReset();
		        	console.log("you win");
		        } 
		        else if (guesses == 1) {
		        	losses++;
		            gameReset();
		            console.log("Computer picks new word: " + computerWord);
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

	var html = 	"<h1>The Hangman Game</h1>" +
				"<p>Press any key to start!</p>" +
				"<p>Wins: " + wins + "</p>" +
				"<p>Losses: " + losses + "</p>" +
				"<p>Guesses left: " + guesses + "</p>" +
				"<p>Your Guesses so far: " + userGuesses + "</p>"
				"<p>CurrentWord: " + "</p>";
				

	document.querySelector(".game").innerHTML = html;
}



// for (var i = 0; i < computerWord.length; i++)
// 	{
// 		answerDashes.push("_");
// 		currentWord = answerDashes.join(" ");
// 		document.getElementById("answer").innerHTML = currentWord;
// 	}