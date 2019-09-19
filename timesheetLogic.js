// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBuh3bn1X9StgphhVQ898QfRi8XHnqSW30",
  authDomain: "alexfsf-7b2e5.firebaseapp.com",
  databaseURL: "https://alexfsf-7b2e5.firebaseio.com",
  projectId: "alexfsf-7b2e5",
  storageBucket: "",
  messagingSenderId: "173416667834",
  appId: "1:173416667834:web:b727ff52892ccfbe844083"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestin = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestin,
    start: trainStart,
    rate: trainRate
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestin = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDestin);
  console.log(trainStart);
  console.log(trainRate);

  // Prettify the employee start
  var militFormat = "HH:mm";
  var convertedTime = moment(trainStart, militFormat);

  console.log(convertedTime.format("HH:mm"));
  console.log(convertedTime.toNow("mm"));


//   var trainStartPretty = moment.unix(trainStart).format("HH:mm");
// console.log(trainStartPretty);
//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var trainMonths = moment().diff(moment(trainStart, "X"), "minutes");
//   console.log(trainMonths);

  // Calculate the total billed rate
  var trainMinAway = trainStart;//trainMonths * trainRate;
  console.log(trainMinAway);

  // Create the new row //Pretty
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestin),
    $("<td>").text(trainStart), 
    // $("<td>").text(trainMonths),
    $("<td>").text(trainRate),
    $("<td>").text(trainMinAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
