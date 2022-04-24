//PSEUDO CODE
// Step 1: Create Deck
var makeDeck = function () {
  var suits = ["❤️", "💎", "♣️", "♠️"];
  var cardDeck = [];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j < 14; j++) {
      var card = {
        name: ``,
        suit: ``,
        rank: ``
      };

      card.suit = suits[i];
      //console.log(card.suit);
      card.rank = j;
      //console.log(card.rank);
      card.name = `${j}`;
      if (card.rank == 11) {
        card.name = `Jack`;
        card.rank = 10;
      } else if (card.rank == 12) {
        card.name = `Queen`;
        card.rank = 10;
      } else if (card.rank == 13) {
        card.name = `King`;
        card.rank = 10;
      } else if (card.rank == 1) {
        card.name = `Ace`;
      }
      //console.log(card.name);
      cardDeck.push(card);
    }
  }
  //console.log(cardDeck);
  return cardDeck;
};

//Step 2: Shuffle Deck
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//Graphical DOM Stuff
var createHitStandButtons = function () {
  const elem = document.querySelector(`#submit-button`);
  elem.style.visibility = `hidden`; //makes the submit button "disappear"
  var createHitButton = document.querySelector(`#hit-button`);
  createHitButton.style.visibility = `visible`;
  var createStandButton = document.querySelector(`#stand-button`);
  createStandButton.style.visibility = `visible`;
  var locationForHitButton = document.querySelector(`.container`);
  locationForHitButton.appendChild(createHitButton);
  locationForHitButton.appendChild(createStandButton);
  return;
};
var reverseButtons = function () {
  const elem = document.querySelector(`#submit-button`);
  elem.style.visibility = `visible`; //makes the submit button "disappear"
  if (gameMode == `playerStands`) {
    elem.innerText = "Reveal the Winner!";
    var createHitButton = document.querySelector(`#hit-button`);
    createHitButton.style.visibility = `hidden`;
    var createStandButton = document.querySelector(`#stand-button`);
    createStandButton.style.visibility = `hidden`;
  } else if (gameMode == `Deal2Cards`) {
    elem.innerText = "Lets Play Again!";
  }
  return;
};

//Step 3: Start Blackjack game between Dealer and Player
//Global Variables here
var comScore = 0; //to capture the combined rank of all the cards of the computer
var playerScore = 0; //to capture the combined rank of all the cards of the player
var winRateComputer = 0;
var winRatePlayer = 0;
var drawRate = 0;
var handsComputer = []; //array to capture the individual cards of the computer
var handsPlayer = []; //array to capture the individual cards of the player
var gameMode = `Deal2Cards`;
var shuffledDeck = [];

//functions to generate scalable output of cards by suit and name for use in the OutputMessage
var helpfulFunctionPlayer = function () {
  var outputPlayer = ``;
  for (i = 0; i < handsPlayer.length; i += 1) {
    outputPlayer += `, ${handsPlayer[i].name} of ${handsPlayer[i].suit}`;
  }
  return outputPlayer;
};
var helpfulFunctionComputer = function () {
  var outputComputer = ``;
  for (i = 0; i < handsComputer.length; i += 1) {
    outputComputer += `, ${handsComputer[i].name} of ${handsComputer[i].suit}`;
  }
  return outputComputer;
};

//Helper Function for Initial (first two cards) Win Condition
var checkForBlackjack = function () {
  var msg = ``;
  if (comScore == 21 && playerScore != 21) {
    winRateComputer++;
    msg =
      `BLACKJACK! Computer wins with score ${comScore}. Player had ${playerScore} <br> 
    Player's hand was ` +
      helpfulFunctionPlayer() +
      `. <br>
    Computer's hand was` +
      helpfulFunctionComputer() +
      `. <br>
    Current Player Win: ${winRatePlayer} <br> 
    Current Computer Win: ${winRateComputer} <br> 
    Current Draws: ${drawRate}`;
  } else if (comScore != 21 && playerScore == 21) {
    winRatePlayer++;
    msg =
      `BLACKJACK! Player wins with score ${playerScore}. Computer had ${comScore} <br> 
    Player's hand was ` +
      helpfulFunctionPlayer() +
      `. <br>
    Computer's hand was` +
      helpfulFunctionComputer() +
      `. <br>
    Current Player Win: ${winRatePlayer} <br> 
    Current Computer Win: ${winRateComputer} <br> 
    Current Draws: ${drawRate}`;
  }
  return msg;
};

//determine winner function
var outcomeBlackJack = function () {
  if ((comScore > 21 && playerScore > 21) || comScore == playerScore) {
    drawRate++;
    msg =
      `Draw! <br>
    Player's hand was ` +
      helpfulFunctionPlayer() +
      `. <br>
    Computer's hand was` +
      helpfulFunctionComputer() +
      `. <br> 
    Current Player Win: ${winRatePlayer} <br> 
    Current Computer Win: ${winRateComputer} <br> 
    Current Draws: ${drawRate}`;
  } else if (
    (playerScore > comScore && playerScore < 22) ||
    comScore > 21 ||
    (playerScore == 21 && comScore != 21)
  ) {
    winRatePlayer++;
    msg =
      `Player wins with score ${playerScore}. Computer had ${comScore} <br> 
    Player's hand was ` +
      helpfulFunctionPlayer() +
      `. <br>
    Computer's hand was` +
      helpfulFunctionComputer() +
      `. <br>
    Current Player Win: ${winRatePlayer} <br> 
    Current Computer Win: ${winRateComputer} <br> 
    Current Draws: ${drawRate}`;
  } else if (
    (comScore > playerScore && comScore < 22) ||
    playerScore > 21 ||
    (playerScore != 21 && comScore == 21)
  ) {
    winRateComputer++;
    msg =
      `Computer wins with score ${comScore}. Player had ${playerScore} <br> 
    Player's hand was ` +
      helpfulFunctionPlayer() +
      `. <br>
    Computer's hand was` +
      helpfulFunctionComputer() +
      `. <br>
    Current Player Win: ${winRatePlayer} <br> 
    Current Computer Win: ${winRateComputer} <br> 
    Current Draws: ${drawRate}`;
  }
  return msg;
};

//Is my ace a 1 or a 11?
var aceEleven = function () {
  if (playerScore <= 11) {
    for (var x = 0; x < handsPlayer.length; x += 1) {
      if (`Ace` == handsPlayer[x].name) {
        if (playerScore <= 11) {
          playerScore += 10;
        }
      }
    }
  }
  return playerScore;
};

//Initial Two Card Deal Mode
var dealTwoCards = function () {
  for (i = 0; i < 2; i++) {
    handsComputer.push(shuffledDeck.pop());
    handsPlayer.push(shuffledDeck.pop());
  }
  //generate combined score of all the cards in the computer's hand
  for (i = 0; i < handsComputer.length; i++) {
    comScore += handsComputer[i].rank;
  }
  //generate combined score of all the cards in the player's hand
  for (i = 0; i < handsPlayer.length; i++) {
    playerScore += handsPlayer[i].rank;
  }
  if (
    (handsComputer[0].name == `Ace` &&
      handsComputer[1].name == (`King` || `Queen` || `Jack`)) ||
    (handsComputer[1].name == `Ace` &&
      handsComputer[0].name == (`King` || `Queen` || `Jack`))
  ) {
    comScore = 21;
  } else if (
    (handsPlayer[0].name == `Ace` &&
      handsPlayer[1].name == (`King` || `Queen` || `Jack`)) ||
    (handsPlayer[1].name == `Ace` &&
      handsPlayer[0].name == (`King` || `Queen` || `Jack`))
  ) {
    playerScore = 21;
  }
};

//Main Game here
var main = function (input) {
  var outputMsg = ``;
  //Step 4: Deal two cards each to Player and Dealer
  //issue two cards in sequence to both player and computer
  if (gameMode == `Deal2Cards`) {
    shuffledDeck = shuffleCards(makeDeck()); //Starts with a freshly shuffled deck every time
    //resets both player and computer score back to 0 at the start of each game
    comScore = 0;
    playerScore = 0;
    handsComputer = [];
    handsPlayer = [];
    outputPlayer = ``;
    outputComputer = ``;
    dealTwoCards();
    outputMsg = checkForBlackjack();
    if (outputMsg != ``) {
      return outputMsg;
    }
    gameMode = `HitOrStand`;
    outputMsg =
      `You drew` +
      helpfulFunctionPlayer() +
      ` .Your total score is ${playerScore}. <br>  Computer's hand was` +
      helpfulFunctionComputer() +
      ` and its score is ${comScore}. <br>   Hit or Stand?`;
    createHitStandButtons();
    return outputMsg;
  } else if (gameMode == `HitOrStand`) {
    if (input == `Hit`) {
      handsPlayer.push(shuffledDeck.pop());
      playerScore += handsPlayer[handsPlayer.length - 1].rank;
      outputMsg = `You drew ${handsPlayer[handsPlayer.length - 1].name} of ${
        handsPlayer[handsPlayer.length - 1].suit
      }. <br>
      Your score is ${playerScore}. Do you want to Hit again or Stand?`;
      return outputMsg;
    } else if (input == `Stand`) {
      gameMode = `playerStands`;
      playerScore = aceEleven();
      outputMsg =
        `Player has chose to stand. Your hand is ` +
        helpfulFunctionPlayer() +
        ` .Your score is ${playerScore}. <br> The computer will now act`;
      reverseButtons();
      return outputMsg;
    }
  } else if (gameMode == `playerStands`) {
    while (comScore < 17) {
      //rules dictate that the dealer has to draw if his score is less than 17
      handsComputer.push(shuffledDeck.pop());
      comScore += handsComputer[handsComputer.length - 1].rank;
      outputMsg = `As Computer had an initial score of less than 17, <br>
      Computer drew another card, ${
        handsComputer[handsComputer.length - 1].name
      } of ${handsComputer[handsComputer.length - 1].suit} <br>
      Computer's score is now ${comScore}.`;
      return outputMsg;
    }
    outputMsg = outcomeBlackJack();
    gameMode = `Deal2Cards`;
    reverseButtons();
    return outputMsg;
  }
};
