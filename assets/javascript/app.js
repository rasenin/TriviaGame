// free trivia api url
var queryURL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";

var results; // stores results of the ajax call

//  Variable that will hold our setInterval that runs the timer
var intervalId;
var secondsLeft = 5;

var answers = [];
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var timerOffset;

$("#start-button").on("click", function() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#start-button").hide();
    $(".trivia-content").show();
    $("#done-button").show();

    $("#timer").html(
      "Time Remaining: " +
        "<span id=seconds>" +
        secondsLeft +
        "</span>" +
        " Seconds"
    );

    timerOffset = $("#seconds").offset().top;

    intervalId = setInterval(function() {
      secondsLeft--;

      $("#timer").html(
        "Time Remaining: " +
          "<span id=seconds>" +
          secondsLeft +
          "</span>" +
          " Seconds"
      );

      if (secondsLeft === 0) {
        clearInterval(intervalId);
        timesUp();
      }
    }, 1000);

    results = response.results;

    for (var i = 0; i < results.length; i++) {
      var question = $("<p>").html(results[i].question);

      var questionBox = $("<div>").addClass("questionBox");

      questionBox.append(question);

      var potentialAnswers = [];

      // pick a random spot to insert the correct answer
      var randomSpot =
        Math.floor(Math.random() * results[i].incorrect_answers.length) + 1;

      answers.push(randomSpot);

      for (var j = 0; j < randomSpot; j++) {
        potentialAnswers.push(results[i].incorrect_answers[j]);
      }

      potentialAnswers.push(results[i].correct_answer);

      // get the rest of the incorrect answers
      for (var j = randomSpot; j < results[i].incorrect_answers.length; j++) {
        potentialAnswers.push(results[i].incorrect_answers[j]);
      }

      for (var j = 0; j < potentialAnswers.length; j++) {
        questionBox.append(
          "<input class='option' type='radio'" +
            " name=q" +
            i +
            " value=" +
            j +
            ">" +
            potentialAnswers[j]
        );

        $("form").append(questionBox);
      }
    }
    $("form").append(
      '<button type="submit" id="done-button" class="button">Done</button>'
    );
  });
});

$("#restart-button").on("click", function() {
  location.reload();
});

function displayDone() {
  $(".trivia-content").hide();
  $(".done-page").show();
  $("#restart-button").show();

  $(".done-page").append("<h3>Correct Answers: " + correct + "</h3>");
  $(".done-page").append("<h3>Incorrect Answers: " + incorrect + "</h3>");
  $(".done-page").append("<h3>Unanswered: " + unanswered + "</h3>");
}

function onSubmit() {
  clearInterval(intervalId);
  event.preventDefault();
  for (var i = 0; i < 10; i++) {
    var choice = document.forms["quiz"]["q" + i].value;
    if (choice === "") {
      unanswered++;
    } else {
      // answered
      if (parseInt(choice) === answers[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
  }
  displayDone();
}

function timesUp() {
  for (var i = 0; i < 10; i++) {
    var choice = document.forms["quiz"]["q" + i].value;
    if (choice === "") {
      unanswered++;
    } else {
      // answered
      if (parseInt(choice) === answers[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
  }
  displayDone();
}

$(window).scroll(function() {
  var scrollPos = $(window).scrollTop();

  if (scrollPos >= timerOffset) {
    $("#seconds").addClass("fixed");
  } else {
    $("#seconds").removeClass("fixed");
  }
});
