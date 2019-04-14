// WHAT TO TRACK
// url
// timer

var secondsLeft = 5;

//  Variable that will hold our setInterval that runs the timer
var intervalId;




// WHAT TO DO
// when start clicked, fill trivia-content with trivia retrieved from api call

var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// })
// .then(function(response) {
//   console.log(response);
// });

$("#start-button").on("click", function() {
  $("#start-button").addClass("hidden");
  $(".trivia-content").removeClass("hidden");

  $("#timer").text("Time Remaining: " + secondsLeft + " Seconds");

  intervalId = setInterval(function() {    
    secondsLeft--;

    $("#timer").text("Time Remaining: " + secondsLeft + " Seconds");

    if (secondsLeft === 0) {
      clearInterval(intervalId);
      displayDone();
    }


  }, 1000);

});


$("#restart-button").on("click", function() {
  location.reload();
});

function displayDone() {
  $(".trivia-content").addClass("hidden");
  $(".done").removeClass("hidden");
  $("#restart-button").removeClass("hidden");
}