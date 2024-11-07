
let startTime;
let timerInterval; 

async function registerCandidate(event) {
    event.preventDefault(); 

   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();

        
        if (result.success) {
            alert('Registration successful! You may now start the exam.');

            
            document.getElementById('registration-container').style.display = 'none';
            document.getElementById('exam-container').style.display = 'block';

            
            startTimer();

            
            fetchQuestions();
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error("Error registering candidate:", error);
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000); // time in seconds
        document.getElementById('timer').innerText = `Time Taken: ${timeElapsed} seconds`;
    }, 1000);
}

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:5000/api/questions');
        const questions = await response.json();

        const questionsContainer = document.getElementById('questions-container');
        questionsContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `<p>${index + 1}. ${question.questionText}</p>`;

            question.options.forEach((option, optionIndex) => {
                questionDiv.innerHTML += `
                    <label>
                        <input type="radio" name="question${index}" value="${optionIndex}">
                        ${option}
                    </label><br>
                `;
            });

            questionsContainer.appendChild(questionDiv);
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

async function submitExam() {

    clearInterval(timerInterval);

    const answers = [];
    document.querySelectorAll('.question').forEach((questionDiv, index) => {
        const selectedOption = questionDiv.querySelector('input[type=radio]:checked');
        if (selectedOption) {
            answers[index] = parseInt(selectedOption.value);
        }
    });

    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Time in seconds

    try {
        const response = await fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers, timeTaken })
        });

        const result = await response.json();
        document.getElementById('result').innerText = `Your score: ${result.score} / ${result.total}. Time taken: ${timeTaken} seconds.`;
    } catch (error) {
        console.error("Error submitting exam:", error);
    }
}


fetchQuestions();
