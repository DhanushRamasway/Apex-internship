// Quiz Data - Computer Science Questions
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which data structure follows LIFO (Last In First Out) principle?",
        options: [
            "Queue",
            "Stack",
            "Array",
            "Linked List"
        ],
        correct: 1
    },
    {
        question: "What is the time complexity of binary search?",
        options: [
            "O(n)",
            "O(n²)",
            "O(log n)",
            "O(1)"
        ],
        correct: 2
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: [
            "Assembly",
            "C",
            "FORTRAN",
            "COBOL"
        ],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Which sorting algorithm has the best average time complexity?",
        options: [
            "Bubble Sort",
            "Insertion Sort",
            "Merge Sort",
            "Selection Sort"
        ],
        correct: 2
    },
    {
        question: "What is the maximum number of nodes in a binary tree of height h?",
        options: [
            "2^h",
            "2^h - 1",
            "2^(h+1) - 1",
            "2^(h-1)"
        ],
        correct: 2
    },
    {
        question: "Which protocol is used for secure web communication?",
        options: [
            "HTTP",
            "FTP",
            "HTTPS",
            "SMTP"
        ],
        correct: 2
    },
    {
        question: "What does OOP stand for in programming?",
        options: [
            "Object Oriented Programming",
            "Only One Programming",
            "Optimal Object Programming",
            "Open Object Programming"
        ],
        correct: 0
    },
    {
        question: "Which data structure is used to implement recursion?",
        options: [
            "Queue",
            "Array",
            "Stack",
            "Tree"
        ],
        correct: 2
    },
    {
        question: "What is the default port number for HTTP?",
        options: [
            "21",
            "80",
            "443",
            "8080"
        ],
        correct: 1
    },
    {
        question: "Which algorithm is used to find the shortest path in a graph?",
        options: [
            "DFS",
            "BFS",
            "Dijkstra's Algorithm",
            "Kruskal's Algorithm"
        ],
        correct: 2
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "Standard Query Language",
            "Sequential Query Language"
        ],
        correct: 0
    },
    {
        question: "Which is NOT a programming paradigm?",
        options: [
            "Object-Oriented",
            "Functional",
            "Procedural",
            "Algorithmic"
        ],
        correct: 3
    },
    {
        question: "What is the space complexity of merge sort?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],
        correct: 2
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let timer = 30;
let timerInterval;
let userAnswers = [];

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionBtns = document.querySelectorAll('.option-btn');
const timerElement = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const finalScore = document.getElementById('final-score');
const correctCount = document.getElementById('correct-count');
const wrongCount = document.getElementById('wrong-count');
const accuracy = document.getElementById('accuracy');
const scoreMessage = document.getElementById('score-message');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

optionBtns.forEach(btn => {
    btn.addEventListener('click', selectOption);
});

// Start Quiz Function
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
    startTimer();
}

// Load Question Function
function loadQuestion() {
    const question = quizData[currentQuestion];
    
    questionText.textContent = question.question;
    questionCounter.textContent = `${currentQuestion + 1}/${quizData.length}`;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Load options
    optionBtns.forEach((btn, index) => {
        const optionText = btn.querySelector('.option-text');
        optionText.textContent = question.options[index];
        btn.classList.remove('selected', 'correct', 'wrong');
        btn.disabled = false;
    });
    
    nextBtn.disabled = true;
    timer = 30;
    timerElement.textContent = timer;
}

// Start Timer Function
function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        
        // Change timer color based on remaining time
        const timerContainer = document.querySelector('.timer-container');
        if (timer <= 10) {
            timerContainer.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else if (timer <= 20) {
            timerContainer.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        } else {
            timerContainer.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
        }
        
        if (timer === 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

// Select Option Function
function selectOption(e) {
    const selectedBtn = e.currentTarget;
    const selectedOption = parseInt(selectedBtn.dataset.option.charCodeAt(0) - 65); // Convert A,B,C,D to 0,1,2,3
    
    // Remove previous selections
    optionBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to current button
    selectedBtn.classList.add('selected');
    
    // Store user answer
    userAnswers[currentQuestion] = selectedOption;
    
    // Enable next button
    nextBtn.disabled = false;
    
    // Stop timer
    clearInterval(timerInterval);
    
    // Show correct/wrong answers
    showAnswers(selectedOption);
}

// Show Answers Function
function showAnswers(selectedOption) {
    const correctOption = quizData[currentQuestion].correct;
    
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        
        if (index === correctOption) {
            btn.classList.add('correct');
        } else if (index === selectedOption && selectedOption !== correctOption) {
            btn.classList.add('wrong');
        }
    });
    
    // Update score
    if (selectedOption === correctOption) {
        score++;
    }
}

// Handle Time Up Function
function handleTimeUp() {
    // Mark as wrong answer
    userAnswers[currentQuestion] = -1; // -1 indicates no answer/timeout
    
    // Show correct answer
    const correctOption = quizData[currentQuestion].correct;
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctOption) {
            btn.classList.add('correct');
        }
    });
    
    // Enable next button
    nextBtn.disabled = false;
}

// Next Question Function
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
        startTimer();
    } else {
        showResults();
    }
}

// Show Results Function
function showResults() {
    clearInterval(timerInterval);
    
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Calculate results
    const totalQuestions = quizData.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const accuracyPercentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update results display
    finalScore.textContent = correctAnswers;
    correctCount.textContent = correctAnswers;
    wrongCount.textContent = wrongAnswers;
    accuracy.textContent = `${accuracyPercentage}%`;
    
    // Set score message based on performance
    let message = '';
    if (accuracyPercentage >= 90) {
        message = '🎉 Outstanding! You\'re a CS expert!';
    } else if (accuracyPercentage >= 80) {
        message = '👏 Excellent work! Great CS knowledge!';
    } else if (accuracyPercentage >= 70) {
        message = '👍 Good job! Keep learning and improving!';
    } else if (accuracyPercentage >= 60) {
        message = '📚 Not bad! More practice will help!';
    } else {
        message = '💪 Keep studying! You\'ll get better!';
    }
    
    scoreMessage.textContent = message;
    
    // Add animation to score circle
    animateScore(correctAnswers, totalQuestions);
}

// Animate Score Function
function animateScore(finalScore, total) {
    const scoreElement = document.getElementById('final-score');
    let currentScore = 0;
    const increment = finalScore / 30; // Animate over 30 frames
    
    const animation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(animation);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, 50);
}

// Restart Quiz Function
function restartQuiz() {
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    // Reset all state
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    clearInterval(timerInterval);
    
    // Reset timer container color
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (quizScreen.classList.contains('active')) {
        // A, B, C, D keys for options
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < optionBtns.length && !optionBtns[optionIndex].disabled) {
                optionBtns[optionIndex].click();
            }
        }
        
        // Enter key for next question
        if (e.key === 'Enter' && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
    
    // Space bar to start quiz or restart
    if (e.key === ' ') {
        e.preventDefault();
        if (welcomeScreen.classList.contains('active')) {
            startBtn.click();
        } else if (resultsScreen.classList.contains('active')) {
            restartBtn.click();
        }
    }
});

// Add visual feedback for keyboard shortcuts
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard hints
    const keyboardHint = document.createElement('div');
    keyboardHint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 12px;
        opacity: 0.7;
        z-index: 1000;
        transition: opacity 0.3s ease;
    `;
    keyboardHint.innerHTML = `
        <div>💡 Keyboard Shortcuts:</div>
        <div>1-4: Select options</div>
        <div>Enter: Next question</div>
        <div>Space: Start/Restart</div>
    `;
    
    document.body.appendChild(keyboardHint);
    
    // Hide keyboard hint on mobile
    if (window.innerWidth <= 768) {
        keyboardHint.style.display = 'none';
    }
});

// Add smooth transitions between questions
function addTransitionEffect() {
    const quizContent = document.querySelector('.quiz-content');
    quizContent.style.opacity = '0';
    quizContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        quizContent.style.transition = 'all 0.3s ease';
        quizContent.style.opacity = '1';
        quizContent.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure welcome screen is active
    welcomeScreen.classList.add('active');
    
    // Add loading animation to floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
        logo.style.transition = 'transform 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
});