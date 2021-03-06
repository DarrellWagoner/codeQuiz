var start_btn = document.querySelector(".start_btn button");
var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = document.querySelector(".buttons .restart");
var quiz_box= document.querySelector(".quiz_box");
var option_list = document.querySelector(".option_list");
var timeCount = quiz_box.querySelector(".timer .timer_sec");

var highScores = localStorage.getItem("userScore");


var timeOff = quiz_box.querySelector("header .time_text");



// click on start button to go to rules
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}


// click on exit button to go to start button
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}
// click on continue button to go to quiz screen
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(60);
    startTimerLine(0);
}
    let que_count = 0;
    let que_numb = 1;
    let counter; 
    let counterLine;
    let timeValue = 60;
    let widthValue = 0;
    let userScore = 0;

    var next_btn = quiz_box.querySelector(".next_btn");
    var result_box = document.querySelector(".result_box");
    var restart_quiz = result_box.querySelector(".buttons .restart");
    var quit_quiz = result_box.querySelector(".buttons .quit");
    // / play again on end final screen
    restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 60;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
    }
// quit on end final screen
    quit_quiz.onclick = ()=>{
    window.location.reload();
    }
    // next button
    next_btn.onclick = ()=>{
        if(que_count < questions.length - 1){
            que_count++;
            que_numb++;
            showQuestions(que_count);
            queCounter(que_numb);
            clearInterval(counter);
            startTimer(timeValue);
            clearInterval(counterLine);
            startTimerLine(widthValue);
            next_btn.style.display = "none";
            timeOff.textContent = "Time Left";
        }else{
            
            console.log("questions completed");
            showResultBox();
        }
    }
    // questions
function showQuestions(index){
    var que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " +questions[index].question +'<span>';
    let option_tag = '<div class="option">'+questions[index].options[0] +'<span></span></div>'
    + '<div class="option">'+questions[index].options[1] +'<span></span></div>'
    + '<div class="option">'+questions[index].options[2] +'<span></span></div>'
    + '<div class="option">'+questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    var option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
    console.log("Answer is correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
}else{
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    for (let i = 0; i < allOptions; i++){
        if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
    }
    }
}
for (let i = 0; i < allOptions; i++){
    option_list.children[i].classList.add("disabled");
   
}
next_btn.style.display = "block";
}
// game results and explanation of results
function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    if(userScore > 6){
    let scoreTag = '<span>huzzah! <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
else if(userScore > 4){
    let scoreTag = '<span>Meh... <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
else{
    let scoreTag = '<span>OOPSIE daisy! <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}
};
// count down and time left
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";
            let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
            }
            for (let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            // next button
            next_btn.style.display = "block";
        }
    }
}


// total number of questons counter
function  queCounter(index){
    var button_ques_counter = quiz_box.querySelector(".total_que");
let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>questions</span>';
button_ques_counter.innerHTML = totalQuesCountTag;
}
// submit initials button
function myFunction(){
    document.getElementById("myForm").submit();
}


localStorage.setItem("highScores", JSON.parse(localStorage.getItem("userScore")) || [];
console.log("userScore");
// game questions and answers
let questions = [
    {
        numb:1,
        question: "What does html stand for?",
        answer: "hyper text markup language",
        options:[
            "hex tutorial matrix land",
            "hyper text markup language",
            "hyper text multiple language",
            "hyper text multi language"
        ]

    },
    {
    numb:2,
        question: "What does CSS stand for?",
        answer: "cascading style sheets",
        options:[
            "central style syntax",
            "cascading style sheets",
            "coding & sorting syntax ",
            "creation of style systems"
        ]

    },
    {
        numb:3,
            question: "When a programmer writes a program, the code is known as?",
            answer: "source code",
            options:[
                "source code",
                "object code",
                "object module",
                "logic module"
            ]
    
        },
    {
    numb:4,
        question: "what tag is used to specify a section of text that provides an example of computer code?",
        answer: "embed",
        options:[
            "embed",
            "code",
            "!doctype",
            "caption"
        ]

    },
    {
        numb:5,
            question: "The ____ attribute is used to identify the values of variables.",
            answer: "content",
            options:[
                "text",
                "http-equiv",
                "content",
                "name"
            ]
    
        },
        {
        numb:6,
        question: "What tag is used to define an unordered list that is bulleted?",
        answer: "ul",
        options:[
            "u",
            "ul",
            "li",
            "ol"
        ]

    },
    {
    numb:7,
    question: "The language that instructs the browser on how to display the hypertext, and adds pictures to the document is __",
    answer: "html",
    options:[
        "C#",
        "cobol",
        "basic",
        "html"
    ]
    },
    {
        numb:8,
    question: "Which tag is used to identify the keywords describing the site?",
    answer: "meta tag",
    options:[
        "comment tag",
        "title tag",
        "meta tag",
        "anchor tag"
    ]
    },
    {
        numb:9,
    question: "Which are used with a tag to modify its function?",
    answer: "attributes",
    options:[
        "files",
        "functions",
        "attributes",
        "documents"
    ]
    },
    {
        numb:10,
    question: "What is Bootstrap in programming?",
    answer: "a framework for building sites",
    options:[
        "An overused cliche",
        "a subset of javascript",
        "a framework for building sites",
        "a backend database"
    ]
    },
    
];
