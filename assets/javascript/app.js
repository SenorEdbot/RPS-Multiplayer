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