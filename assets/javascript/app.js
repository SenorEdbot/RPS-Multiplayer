// Initialize Firebase
var config = {
    apiKey: "AIzaSyDc31TZWiSfh_3OhWQRimB98sZI2W67fkY",
    authDomain: "eddiefrancokubootcamp.firebaseapp.com",
    databaseURL: "https://eddiefrancokubootcamp.firebaseio.com",
    projectId: "eddiefrancokubootcamp",
    storageBucket: "eddiefrancokubootcamp.appspot.com",
    messagingSenderId: "295074090518"
};
firebase.initializeApp(config);
var database = firebase.database();


firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // 
  });
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(user)
    return uid;
    // ...
} else {
    // User is signed out.
    // ...
}
// ...
});
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var userDataRef = database.ref("/userData");
var user1Ref = database.ref("/userData/user_1");
var user2Ref = database.ref("/userData/user_2");

var user1_wins = 0
var user1_losses = 0;
var user2_wins = 0;
var user2_losses = 0;
var user1_guess, user2_guess, user1_id, user2_id;

// When the client's connection state changes and on initial load
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    if (snap.numChildren() === 1) {
        console.log("only 1 person connected")
        user1_id = 1;     
        user1Ref.set({
            guess: null,
            wins: 0,
            losses: 0
        })
        //Code for when there is only 1 user connected
    } else if (snap.numChildren() === 2) {
        console.log("only 2 people connected")
        user2_id = 2;
        user2Ref.set({
            guess: null,
            wins: 0,
            losses: 0
        })
        //Code for when there are 2 users connected (THE GAME SHOULD RUN)
    } else if (snap.numChildren() > 2) {
        console.log("more than 2 people connected")
        //Code for when there are multiple users
    } else {
        return false;
    }
});
console.log(connectionsRef);
$(document).on('click', '.user1Guess', function(e){
    if ($(this).text() === 'Rock') {
        user1_guess = 'r'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }

    } else if ($(this).text() === 'Paper') {
        user1_guess = 'p'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }
    } else if ($(this).text() === 'Scissors') {
        user1_guess = 's'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }
    }
})
$(document).on('click', '.user2Guess', function(e){
    
    if ($(this).text() === 'Rock') {
        user2_guess = 'r'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }
    } else if ($(this).text() === 'Paper') {
        user2_guess = 'p'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }
    } else if ($(this).text() === 'Scissors') {
        user2_guess = 's'
        if ((user1_guess) && (user2_guess)) {
            gameLogic(user1_guess, user2_guess)
            databaseSet();
            gameReset();
        }
    }
})

var gameLogic = function (x, y) {
    if ((x === "r") && (y === "s")) {
        user1_wins++;
        user2_losses++;
    } else if ((x === "r") && (y === "p")) {
        user1_losses++;
        user2_wins++;
    } else if ((x === "s") && (y === "r")) {
        user1_losses++;
        user2_wins++;
    } else if ((x === "s") && (y === "p")) {
        user1_wins++;
        user2_losses++;
    } else if ((x === "p") && (y === "r")) {
        user1_wins++;
        user2_losses++;
    } else if ((x === "p") && (y === "s")) {
        user1_losses++;
        user2_wins++;
    }
}
var databaseSet = function() {
    user1Ref.set({
        guess: user1_guess,
        wins: user1_wins,
        losses: user1_losses
    })
    user2Ref.set({
        guess: user2_guess,
        wins: user2_wins,
        losses: user2_losses
    })
}
var gameReset = function () {
    user1_guess = '';
    user2_guess = '';
}
database.ref("/userData").on("value", function (snapshot) {
    if (snapshot.child("user_1").exists() && snapshot.child("user_2").exists()) {
        $('#user1W').text(snapshot.val().user_1.wins);
        $('#user1L').text(snapshot.val().user_1.losses);
        $('#user2W').text(snapshot.val().user_2.wins);
        $('#user2L').text(snapshot.val().user_2.losses);
    }
})
//When a user clicks Rock Paper or Scissors add that value to the currentRPSGame array
//currentRPSGame should only fire when there are 2 values in the array. It should also clear after every game
//After 1 user clicks they should see some type of response on their own server side while they wait for the other person

//Once the currentRPSGame has 2 values--
    //This is where the logic to decide who won will come into play
    //Send both users their respective Wins and Losses
    //Reset the currentRPSGame so the next game can be played after the wins and losses are recorded.

//When the user presses the connect button that is when the game should add them to the database and determie if they are the 1st, 2nd or 3+ member
//1st person should be told to wait. If there are 2 the game should run until one of them disconnects and then the game should reset before trying to connect again. 
//If there is a 3+ person they should be displayed a wait page. Once the queue goes down to 2 the 3rd person will become 2nd and join and all the rest will incrimend down 1

//When the user types in Chat is should display who is typing and what they typed.
//It should allow the next response to be appended to the bottom of the chat allowing for flowing conversation
//THe chat window should not expand rather it should scroll