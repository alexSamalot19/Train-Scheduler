// Table of Contents:

// 1. Initialize Firebase
// 2. Create button for adding a new train - then update the html + update the database
// 3. Create a way to retrieve train from the train database.
// 4. Create  the Next Arrival. Using difference start time and frequency.
//    Then use moment.js formatting to set difference.
// 5. Write all of the information to the table as a new row

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

firebase.initializeApp(firebaseConfig);

var database = firebase.database();



// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  //User Input
  var trainName = $("#start-input").val().trim();
  var trainStartInp = $("#train-name-input").val().trim();
  var trainDestin = $("#destination-input").val().trim();
  var trainRate = $("#rate-input").val().trim();
  
 
  var placeHolder = String(trainStartInp);
  var trainStart = placeHolder;
  
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestin,
    start: trainStart,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.start);
  // console.log(newTrain.rate);

  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and 
//retrieve the information to make a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

  var TrainInfo = childSnapshot.val();
  var trainName = TrainInfo.name;
  var trainDestin = TrainInfo.destination;
  var trainStart = TrainInfo.start;
  var trainRate = TrainInfo.rate;

  // // Train Info
  // console.log("TrainName=" + trainName);
  // console.log("TrainDestin=" + trainDestin);
  // console.log("TrainStart=" + trainStart);
  // console.log("TrainRate=" + trainRate);


  // 4. Create  the Next Arrival. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
  var militFormat = "HH:mm";
  // console.log("start1" + trainStart);
 var startdate = moment(trainStart, militFormat);
  // console.log("start" + startdate.format("HH:mm"));
var expected_enddate = moment();
  console.log("now" + expected_enddate.format("HH:mm"));
var returned_endate = startdate;
  console.log("nowVar" + returned_endate);
  console.log("endVar" + expected_enddate);


  while (returned_endate.isAfter(expected_enddate) !== true) {

    returned_endate = moment(returned_endate).add(trainRate, 'minutes');
    console.log("inloop" + returned_endate.format("HH:mm"));

  }


  console.log(returned_endate.diff(expected_enddate, "minutes"));

  var nextArrival = returned_endate.format("HH:mm");
  var minAway = returned_endate.diff(expected_enddate, "minutes");

  console.log(minAway);



// 5. Write all of the information to the table as a new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestin),
    $("<td>").text(trainRate),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway)
  );
  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

