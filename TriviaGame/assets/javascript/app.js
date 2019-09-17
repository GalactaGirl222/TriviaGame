//VARIABLES
var wins = 0;
var losses = 0;
var unanswered = 0;
var triviaBlock = $("#triviaBlock");
var timerBlock = $("#timer");
var counter = 10;
var arrCount = 0;
var timer;


//Do not display trivia questions initially
triviaBlock.hide();


//Once user clicks Play game buton, display trivia questions and call the games' various functions
$("#play").click(function () {

    $("#instructions").hide();
    triviaBlock.show();

    displayQuestions();
    myTimer();

});


$(document).on("click", ".choice", function (event) {

    selectedChoice = $(this).text();

    if (selectedChoice === correctAnswersArr[arrCount]) {
        clearInterval(timer);
        correctAnswer();
    } else {
        clearInterval(timer);
        wrongAnswer();
    }
});

$(document).on("click", ".reset", function (event) {

    playAgain();
});



//Array of the trivia questions and choices
var allQuestionsArr = [
    {
        question:
            "Question 1: In which year did SpongeBob SquarePants premiere?",
        choices:
            ["1999", "2001"]
    },

    {
        question:
            "Question 2: On Hey Arnold!, which school did Arnold and his friends attend??",
        choices:
            ["P.S 123", "P.S 118"]
    },

    {
        question:
            "Question 3: On Kenan & Kel, who was the feisty old lady who hated Rigby's manager, Chris Potter?",
        choices:
            ["Mrs.Godfried", "Mrs.Quagmire"]
    },

    {
        question:
            "Question 4:Carl from The Adventures of Jimmy Neutron: Boy Genius is obsessed with which animal?",
        choices:
            ["Alpaca",  "Llama"]
    },

    {
        question:
            "Question 5:  Which TV show premiered first?",
        choices:
            ["Sam & Cat", "Henry Danger"]
    },


    {
        question:
            "Question 6:Which of these was Michael Barret afraid of on Zoey 101?",
        choices:
            ["Swiss Cheese", "Roller coasters"]
    },


   {
        question:
            "Question 7:Which of these teams doesn't exist on Legends of the Hidden Temple?",
        choices:
            ["Orange Jaguars", "Green Monkeys"]
    },


{
        question:
            "Question 8:  The dad on That's So Raven was also the dad on which 90s Nickelodeon show?",
        choices:
            ["The Journey of Allen Strange", "Cousin Skeeter"]
    },

{
        question:
            "Question 9: On Rugrats, what was the name of the creepy toy clown Tommy's dad made?",
        choices:
            ["Mr.Happy", "Mr.Friend"]
    },


{
        question:
        "Question 10: Which of these was NOT a recurring sketch on The Amanda Show?",
        choices:
            ["Blockblister", "The Spice Boys"]
    },

];


            var correctAnswersArr = ["1999", "P.S 118", "", "Quagmire", "Llama", "Sam & Cat", " Roller coasters", " Orange Jaguars","Cousin Skeeter","Mr.Friend","The Spice Boys"];


function displayQuestions() {

    $(triviaBlock).html(triviaContent(arrCount));

}


function questionCount() {
    if (arrCount < 2) {
        arrCount++;
        displayQuestions();
        counter = 10;
        myTimer();
    } else {
        scorePage();
    }
}


//Timer for each question
function myTimer() {

    timer = setInterval(tenSeconds, 1000);

    //Ten seconds countdown
    function tenSeconds() {

        if (counter === 0) {
            clearInterval(timer);
            noAnswer();
        }

        if (counter > 0) {
            counter--;
        }

        $("#timer").html("<p>Timer: " + counter + "</p>");
    }

}


function noAnswer() {
    unanswered++;
    $(triviaBlock).html("<p>Sorry, time's up! The correct answer is </p>" + correctAnswersArr[arrCount]);

    setTimeout(questionCount, 3000);
}


function correctAnswer() {
    wins++;
    $(timerBlock).html("");
    $(triviaBlock).html("<p>That's correct! Great work!</p>");
    setTimeout(questionCount, 3000);
}

function wrongAnswer() {
    losses++;
    $(timerBlock).html("");
    $(triviaBlock).html("<p>Sorry, that's wrong! The correct answer is </p>" + correctAnswersArr[arrCount]);
    setTimeout(questionCount, 3000);
}

function scorePage() {
    $(timerBlock).html("");
    $(triviaBlock).html("<p>Thanks for playing the game! Here's your score details: </p><p>Wins: " + wins + "</p><p>Losses: " + losses + "</p><p>Unanswered: " + unanswered + "</p><button class='reset'>Play again!</button>");
}

function playAgain() {
    arrCount = 0;
    wins = 0;
    losses = 0;
    unanswered = 0;
    counter = 11;
    displayQuestions();
    myTimer();
}



//Trivia questions and loop for the choices
function triviaContent(x) {
    var allQuestions = allQuestionsArr[x];
    var allChoices = allQuestions.choices;
    var eachQuestion = allQuestions.question;
    $(triviaBlock).html("<p>" + eachQuestion + "</p>");
    var buttonContainer = $("<div>");

    for (var i = 0; i < allChoices.length; i++) {
        var myButton = $("<button>");
        myButton.addClass("choice");
        myButton.attr("data-name", allChoices[i]);
        myButton.text(allChoices[i]);
        buttonContainer.append(myButton);
        $(triviaBlock).append(myButton);
    }
}