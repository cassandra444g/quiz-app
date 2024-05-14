const questions = [
  {
    question: "What year was CSUF founded?",
    answers: [
      { text: "1957", icon: "apple", correct: true },
      { text: "1960", icon: "strawberry", correct: false },
      { text: "1952", icon: "orange", correct: false },
      { text: "1965", icon: "banana", correct: false },
    ],
  },
  {
    question: "What are the university's colors?",
    answers: [
      { text: "Red, white, black", icon: "apple", correct: false },
      { text: "Green, blue, gold", icon: "strawberry", correct: false },
      { text: "White, orange, navy blue", icon: "orange", correct: true },
      { text: "White, purple, black", icon: "banana", correct: false },
    ],
  },
  {
    question: "What is the mascot?",
    answers: [
      { text: "Dog", icon: "apple", correct: false },
      { text: "Elephant", icon: "strawberry", correct: true },
      { text: "Titan", icon: "orange", correct: false },
      { text: "Panther", icon: "banana", correct: false },
    ],
  },
  {
    question: "What is the name of the student newspaper?",
    answers: [
      { text: "The Fullerton Chronicles", icon: "apple", correct: false },
      { text: "The Daily Titan", icon: "strawberry", correct: true },
      { text: "The Titan Tribune", icon: "orange", correct: false },
      { text: "The Titan Times", icon: "banana", correct: false },
    ],
  },
  {
    question: "What sculpture is located outside of the library?",
    answers: [
      { text: "Julius Caesar", icon: "apple", correct: false },
      { text: "Statue of Liberty", icon: "strawberry", correct: false },
      { text: "The Thinker", icon: "orange", correct: false },
      { text: "The Statue of David", icon: "banana", correct: true },
    ],
  },
  {
    question: "Where are the nap pods located?",
    answers: [
      { text: "Library", icon: "apple", correct: false },
      { text: "Nutwood", icon: "strawberry", correct: false },
      { text: "CAPS Wellness Room", icon: "orange", correct: true },
      { text: "Gastronome", icon: "banana", correct: false },
    ],
  },
  {
    question: "Where do you get your TitanCard?",
    answers: [
      { text: "Bookstore", icon: "apple", correct: false },
      { text: "Library", icon: "strawberry", correct: true },
      { text: "Titan Student Union", icon: "orange", correct: false },
      { text: "Office of Registrar", icon: "banana", correct: false },
    ],
  },
  {
    question: "How many students are enrolled in CSUF?",
    answers: [
      { text: "40,235", icon: "apple", correct: true },
      { text: "25,871", icon: "strawberry", correct: false },
      { text: "37,446", icon: "orange", correct: false },
      { text: "42,912", icon: "banana", correct: false },
    ],
  },
  {
    question: "What is the most popular major?",
    answers: [
      { text: "Computer Science", icon: "apple", correct: false },
      { text: "Business", icon: "strawberry", correct: true },
      { text: "Kinesiology", icon: "orange", correct: false },
      { text: "Nursing", icon: "banana", correct: false },
    ],
  },
  {
    question:
      "Who was recently inducted into the Orange County Hall of Fame from CSUF?",
    answers: [
      { text: "Issa Rae", icon: "apple", correct: false },
      { text: "Quavo", icon: "strawberry", correct: false },
      { text: "Steph Curry", icon: "orange", correct: false },
      { text: "Gwen Stefani", icon: "banana", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const circle1 = document.getElementById("circle1");

let currentQuestionIndex = 0;
let score = 0;
let countdown = 60;

function startQuiz() {
  startTimer();
  currentQuestionIndex = 0;
  score = 0;
  countdown = 60;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function startTimer() {
  const countdownNumber = document.getElementById('countdown-number');
  var countdown = 60;
  circle1.style.animation = "countdown 60s linear infinite forwards";

  countdownNumber.textContent = countdown;

  timeInterval = setInterval(function () {
    countdown = --countdown <= 0 ? timeIsUp() : countdown;
    countdownNumber.textContent = countdown;
  }, 1000);
}

function timeIsUp() {
  countdown = 0;
  showScore();
  clearInterval(timeInterval);
  circle1.style.animation = "none";
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerHTML = answer.text;
    const icon = document.createElement("img");
    icon.src = `icons/${answer.icon}.svg`;
    button.appendChild(icon);
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
  updateProgressBar();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  questionElement.style.textAlign = "center";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.style.margin = "0 auto";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    updateProgressBar();
  } else {
    timeIsUp();
    showScore();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
  if (countdown <= 0) {
    startQuiz();
  } else {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      timeIsUp();
      startQuiz();
    }
  }
});
startQuiz();