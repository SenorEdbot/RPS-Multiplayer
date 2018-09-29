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

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var userDataRef = database.ref("/userData");

// When the client's connection state changes and on initial load
connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
        var con = connectionsRef.push(true);
        
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
  });

connectionsRef.on("value", function(snap) {

// Display the viewer count in the html.
// The number of online users is the number of children in the connections list.
if (snap.numChildren() == 1) {
    console.log("only 1 person connected")
    var connection = userDataRef.child("user 1").push(true);
    connection.onDisconnect().remove();
    //Code for when there is only 1 user connected
} else if (snap.numChildren() == 2) {
    console.log("only 2 people connected")
    var connection = userDataRef.child("user 2").push(true);
    connection.onDisconnect().remove();
    //Code for when there are 2 users connected (THE GAME SHOULD RUN)
} else if (snap.numChildren() > 2) {
    console.log("more than 2 people connected")
    //Code for when there are multiple users
} else {
    return false;
}
});

database.ref("/userData").on("value", function(snapshot) {

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