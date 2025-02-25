let student;
let exam;
let timer;
let timeLeft = 60; // 1 minute


let questions = [
    {
        title: "Do you know the breed?",
        image: "images/dog.jpg",
        options: ["Siberian Husky", "Bulldog", "Saint Bernard"],
        correctAnswer: "Bulldog"
    },
    {
        title: "What is 2+2?",
        image: "images/math.jpg",
        options: ["3", "4", "5"],
        correctAnswer: "4"
    },
    {
        title: "What is the capital of France?",
        image: "images/paris.jpg",
        options: ["Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        title: "Which planet is known as the Red Planet?",
        image: "images/mars.jpg",
        options: ["Earth", "Mars", "Venus"],
        correctAnswer: "Mars"
    },
    {
        title: "Who wrote 'Hamlet'?",
        image: "images/shakespeare.jpg",
        options: ["Shakespeare", "Hemingway", "Tolstoy"],
        correctAnswer: "Shakespeare"
    },
    {
        title: "Which gas do plants absorb from the atmosphere?",
        image: "images/plants.jpg",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        title: "What is the largest ocean on Earth?",
        image: "images/ocean.jpg",
        options: ["Atlantic", "Indian", "Pacific"],
        correctAnswer: "Pacific"
    },
    {
        title: "Which element has the chemical symbol 'O'?",
        image: "images/oxygen.jpg",
        options: ["Gold", "Oxygen", "Osmium"],
        correctAnswer: "Oxygen"
    },
    {
        title: "What is the square root of 64?",
        image: "images/math2.jpg",
        options: ["6", "8", "10"],
        correctAnswer: "8"
    },
    {
        title: "Who painted the Mona Lisa?",
        image: "images/mona_lisa.jpg",
        options: ["Van Gogh", "Da Vinci", "Picasso"],
        correctAnswer: "Da Vinci"
    }
];




// let questions = [
//     new Question("Do you know the breed?", "images/dog.jpg", ["Siberian Husky", "Bulldog", "Saint Bernard"], "Bulldog"),
//     new Question("What is 2+2?", "images/math.jpg", ["3", "4", "5"], "4"),
//     new Question("What is the capital of France?", "images/paris.jpg", ["Berlin", "Paris", "Madrid"], "Paris"),
//     new Question("Which planet is known as the Red Planet?", "images/mars.jpg", ["Earth", "Mars", "Venus"], "Mars"),
//     new Question("Who wrote 'Hamlet'?", "images/shakespeare.jpg", ["Shakespeare", "Hemingway", "Tolstoy"], "Shakespeare"),
//     new Question("Which gas do plants absorb from the atmosphere?", "images/plants.jpg", ["Oxygen", "Carbon Dioxide", "Nitrogen"], "Carbon Dioxide"),
//     new Question("What is the largest ocean on Earth?", "images/ocean.jpg", ["Atlantic", "Indian", "Pacific"], "Pacific"),
//     new Question("Which element has the chemical symbol 'O'?", "images/oxygen.jpg", ["Gold", "Oxygen", "Osmium"], "Oxygen"),
//     new Question("What is the square root of 64?", "images/math2.jpg", ["6", "8", "10"], "8"),
//     new Question("Who painted the Mona Lisa?", "images/mona_lisa.jpg", ["Van Gogh", "Da Vinci", "Picasso"], "Da Vinci")
// ];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").addEventListener("click", startExam);
    document.getElementById("nextBtn").addEventListener("click", showQuestion);
});

function startExam() {
    let studentName = prompt("Enter your name:");
    if (studentName) {
        student = new Student(studentName);
        exam = new Exam(questions);
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        startTimer();
        showQuestion();
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishExam();
        } else {
            document.getElementById("timer").innerText = `Time Left: ${timeLeft} sec`;
            timeLeft--;
        }
    }, 1000);
}

function showQuestion() {
    if (exam.isFinished()) {
        finishExam();
        return;
    }

    let question = exam.getCurrentQuestion();
    document.getElementById("questionTitle").innerText = question.title;
    document.getElementById("questionImage").src = question.image;

    let optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    let shuffledOptions = exam.shuffleArray([...question.options]);

    shuffledOptions.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => {
            document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
            btn.style.backgroundColor = "gray";
            exam.submitAnswer(option);
            document.getElementById("nextBtn").disabled = false;
        });
        optionsContainer.appendChild(btn);
    });

    document.getElementById("nextBtn").disabled = true;
}

function finishExam() {
    clearInterval(timer);
    document.getElementById("quizContainer").innerHTML = `
                <h2>Exam Finished!</h2>
                <p>Your score: ${exam.score}/${questions.length}</p>
                <div class="progress-circle">${Math.round((exam.score / questions.length) * 100)}%</div>
            `;
}
