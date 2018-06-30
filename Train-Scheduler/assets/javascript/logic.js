// Initialize Firebase

var config = {
    apiKey: "AIzaSyB0Hx8sAkCAKi0y592XUDZ5oqAhZmcZkk0",
    authDomain: "train-scheduler-74c6f.firebaseapp.com",
    databaseURL: "https://train-scheduler-74c6f.firebaseio.com",
    projectId: "train-scheduler-74c6f",
    storageBucket: "train-scheduler-74c6f.appspot.com",
    messagingSenderId: "865679610687"
  };

  firebase.initializeApp(config);

  // Global Variables

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency ="";

// Functions

function clock() {
    dateAndTime = new Date();
    hours = dateAndTime.getHours();
    minutes = dateAndTime.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
        console.log(minutes);
    }

    $("#hours").text(hours + " :");
    $("#minutes").text(minutes);
    // console.log(dateAndTime);

}

      $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
            trainName: trainName, 
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        })
        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTrain);
        // console.log(frequency);

        $("#train-name-input").val("");
        $("#destination-input").val("")
        $("#first-train-input").val("");
        $("#frequency-input").val("");

      });

    database.ref().on("child_added", function(childSnapshot) {
        // console.log(childSnapshot.val().trainName);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().firstTrain);
        // console.log(childSnapshot.val().frequency);

        console.log("first train before converting: " + childSnapshot.val().firstTrain);

        var currentTime = moment(currentTime).format("HH:mm");
        // console.log("current time: " + currentTime);

        var firstTrainTime = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
        // console.log("first train converted " + firstTrainTime);

        var timeDiff = moment().diff(moment(firstTrainTime), "minutes");
        // console.log("time diff " + timeDiff);

        var timeApart = timeDiff % parseInt(childSnapshot.val().frequency);
        // console.log("time apart " + timeApart);

        // Minute Until Train
        var minAway = parseInt(childSnapshot.val().frequency) - timeApart;
        // console.log("minutes away " + minAway);

        // Next Train
        var nextTrain = moment().add(minAway, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        var tBody = $("tbody");
        var tRow = $("<tr>");

        var trainNameTD = $("<td>").text(childSnapshot.val().trainName);
        var destinationTD = $("<td>").text(childSnapshot.val().destination);
        var frequencyTD = $("<td>").text(childSnapshot.val().frequency);
        var nextTrainTD = $("<td>").text((nextTrain).format("HH:mm"));
        var minAwayTD = $("<td>").text(minAway);

        tRow.append(trainNameTD, destinationTD, frequencyTD, nextTrainTD, minAwayTD);
        tBody.append(tRow);
        
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });


    // Call Functions
        clock();
        setInterval(clock, 1000 * 60);
  