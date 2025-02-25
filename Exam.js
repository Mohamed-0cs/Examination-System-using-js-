class Exam {
    constructor(questions) {
        this.questions = this.shuffleArray(questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    submitAnswer(answer) {
        if (this.getCurrentQuestion().correctAnswer === answer) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }

    isFinished() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

