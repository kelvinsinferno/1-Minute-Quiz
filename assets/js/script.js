var questionArr = [{
    title: "Inside of which html element do we put JavaScript?",
    choices: ["&lt;script&gt;"
        , "&lt;scripting&gt;"
        , "&lt;js&gt;"
        , "&lt;javascript&gt;"],
    answer: "<script>"
}, {
    title: "Where is the correct place to insert a JavaScript?",
    choices: ["&lt;The &lt;head&gt; section&gt;"
        , "The &lt;body&gt; section"
        , "Both"],
    answer: "The <body> section"
}, {
    title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choices: ['&lt;script name ="xxx.js&gt;'
        , '&lt;script href="xxx.js"&gt;'
        , '&lt;script src="xxx.js"&gt;'],
    answer: '<script src="xxx.js">'
}, {
    title: 'How do you write "Hello World" in an alert box?',
    choices: ['msg("Hello World");'
        , 'msgBox("Hello World");'
        , 'alert("Hello World");'
        , 'alertBox("Hello World");'],
    answer: 'alert("Hello World");'
}]

var startButton = document.querySelector(".start-button");
var countDownTimer = document.querySelector(".countDownTimer");
var questions = document.querySelector(".questions");
var right = document.querySelector(".right");
var wrong = document.querySelector(".wrong");
// Update the count down every 1 second
var timeleft = 60;
//var timer = 
var index = 0;
var countRight = 0;
var countWrong = 0;
var timer
var initialsArray = []

if (localStorage.getItem('initials')) {
    initialsArray = JSON.parse(localStorage.getItem("initials"))
};

startButton.addEventListener("click", function () {
    displayQueston()
    timer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(timer);
            gameOver();
        }
        countDownTimer.textContent = timeleft
        timeleft -= 1;
    }, 1000);
})
// I am presented with a question

function displayQueston() {

    questions.innerHTML = `
    <h1>${questionArr[index].title}</h1>
            
    <div class="options">
      <div class="btn-group">
        <button  class="btn1">${questionArr[index].choices[0]}</button>
        <button class="btn2">${questionArr[index].choices[1]}</button>
        <button class="btn3">${questionArr[index].choices[2]}</button>
        <button class="btn4">${questionArr[index].choices[3]}</button>
      </div>
    </div>
    `
    var btn1 = document.querySelector(".btn1")
    var btn2 = document.querySelector(".btn2")
    var btn3 = document.querySelector(".btn3")
    var btn4 = document.querySelector(".btn4")

    btn1.addEventListener('click', nextquestion)
    btn2.addEventListener('click', nextquestion)
    btn3.addEventListener('click', nextquestion)
    btn4.addEventListener('click', nextquestion)
    // document.getElementById('questions').innerHTML = "title";
    // document.getElementById('button-group').innerHTML = "choices";

}

function nextquestion() {
    console.log(this.textContent, questionArr[index].answer)
    if (this.textContent === questionArr[index].answer) {
        alert("correct")
        countRight++
        right.innerHTML = countRight
    }

    else {
        alert("wrong")
        countWrong++
        wrong.innerHTML = countWrong
    }
    index++
    if (index < questionArr.length) {
        displayQueston()
    }
    else {
        questions.innerHTML = "Game Over Save Your Score -->"
        clearInterval(timer)
    }

}

var save = document.querySelector("#save")
save.addEventListener("click", function () {
    var initialinput = document.querySelector("#initials")
    console.log({ initial: initialinput.value, score: timeleft, countRight, countWrong })
    initialsArray.push({ initial: initialinput.value, score: timeleft, countRight, countWrong })
    localStorage.setItem("initials", JSON.stringify(initialsArray))
    displayScores()
});



var initials = document.querySelector("#initials");
var scores = document.querySelector("#scores");
var clear = document.querySelector("#clear");

// retrieves and renders scores

// var scoreboard = localStorage.getItem("scorboard");
// scoreboard = JSON.parse(scoreboard);

// if (scoreboard !== null) {
//     for (let i = 0; i < scoreboard.length; i++) {
//         var listItem = document.createElement("dl");
//         listItem.textContent = scoreboard[i].initials + " " + scoreboard[i].score;
//         scores.appendChild(listItem);
//         console.log("working?" + listItem);
//     }
// }

function displayScores() {
    var scores = document.querySelector('#scores')
    scores.innerHTML = ""
    for (var i = 0; i < initialsArray.length; i++) {
        scores.innerHTML += `<li>Initial: ${initialsArray[i].initial} Score: ${initialsArray[i].score} Right: ${initialsArray[i].countRight} Wrong: ${initialsArray[i].countWrong} </li>`

    }
} ;

//clear scores when button clicked
clear.addEventListener("click", function () {
    localStorage.clear();
    console.log("clear" + clear);
    location.reload();
})


