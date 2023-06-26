var colorName = ["green", "red", "yellow", "blue"];
var pattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;
var flag = true;
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  $("#level-title").html("Level  " + level);
  level++;

  var randomNumber = Math.random();
  randomNumber *= 4;
  randomNumber = Math.floor(randomNumber);

  randomChosenColor = colorName[randomNumber];
  pattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
function startover()
{
    started=false;
    level=1;
    pattern=[];
    userClickedPattern=[];
    flag=true;
}

$(".btn").click(function (event) {
  if (started === true) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);


    playSound(userChosenColour);
    animatePress(userChosenColour);

    
    // alert(userClickedPattern.length);
    // alert(level-1);
    // alert(flag);

    checkAnswer();

    // alert(userClickedPattern.length);
    // alert(level-1);
    // alert(flag);

    if (userClickedPattern.length === 0 && flag===true ) {

      // if (flag === true) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      
    }
     if (flag===false) {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("h1").html("Game Over Press any other key to restart");

        startover();
        

        

      }
      
  }
});

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) 
  {
    if (userClickedPattern[i] !== pattern[i]) {
      flag = false;
      break;
    }
  }
  if(userClickedPattern.length===pattern.length)
  {

  
    userClickedPattern = [];
  }
}

$(document).keydown(function (event) {
  if (started === false) {
    $("#level-title").html("Level 1");
    started = true;
    nextSequence();
  }
});
