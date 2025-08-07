// Game state
let userScore = 0;
let computerScore = 0;
let roundNumber = 1;
let gameMode = 'classic'; // 'classic' or 'extended'

// DOM elements
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const roundNumber_span = document.getElementById('round-number');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const lizard_div = document.getElementById('lizard');
const spock_div = document.getElementById('spock');
const playerChoiceDisplay = document.querySelector('.player-choice .placeholder');
const computerChoiceDisplay = document.querySelector('.computer-choice .placeholder');
const actionMessage_p = document.getElementById('action-message');
const resetBtn = document.getElementById('reset-btn');
const howToPlayBtn = document.getElementById('how-to-play');
const rulesModal = document.getElementById('rules-modal');
const closeModal = document.querySelector('.close-modal');
const classicModeBtn = document.getElementById('classic-mode');
const extendedModeBtn = document.getElementById('extended-mode');
const gameArea = document.querySelector('.game-area');

// Game icons mapping
const gameIcons = {
    rock: '<i class="fas fa-hand-rock"></i>',
    paper: '<i class="fas fa-hand-paper"></i>',
    scissors: '<i class="fas fa-hand-scissors"></i>',
    lizard: '<i class="fas fa-hand-lizard"></i>',
    spock: '<i class="fas fa-hand-spock"></i>'
};

// Initialize the game
function init() {
    // Event listeners for choices
    rock_div.addEventListener('click', () => game('rock'));
    paper_div.addEventListener('click', () => game('paper'));
    scissors_div.addEventListener('click', () => game('scissors'));
    lizard_div.addEventListener('click', () => game('lizard'));
    spock_div.addEventListener('click', () => game('spock'));
    
    // Event listeners for buttons
    resetBtn.addEventListener('click', resetGame);
    howToPlayBtn.addEventListener('click', showRules);
    closeModal.addEventListener('click', hideRules);
    classicModeBtn.addEventListener('click', () => setGameMode('classic'));
    extendedModeBtn.addEventListener('click', () => setGameMode('extended'));
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === rulesModal) {
            hideRules();
        }
    });
    
    // Initialize displays
    updateScores();
    playerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
}

// Set game mode (classic or extended)
function setGameMode(mode) {
    gameMode = mode;
    
    if (mode === 'classic') {
        gameArea.classList.remove('extended-mode');
        classicModeBtn.classList.add('active');
        extendedModeBtn.classList.remove('active');
        result_div.innerHTML = '<p>Classic mode activated! Choose your weapon.</p>';
    } else {
        gameArea.classList.add('extended-mode');
        classicModeBtn.classList.remove('active');
        extendedModeBtn.classList.add('active');
        result_div.innerHTML = '<p>Extended mode activated! Choose your weapon.</p>';
    }
    
    // Reset choices display
    playerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    actionMessage_p.textContent = 'Make your move!';
}

// Get computer's choice
function getComputerChoice() {
    const choices = gameMode === 'classic' 
        ? ['rock', 'paper', 'scissors'] 
        : ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
}

// Convert to title case
function convertCase(choice) {
    if (choice === 'paper') return 'Paper';
    if (choice === 'scissors') return 'Scissors';
    if (choice === 'lizard') return 'Lizard';
    if (choice === 'spock') return 'Spock';
    return 'Rock';
}

// Update score displays
function updateScores() {
    userScore_span.textContent = userScore;
    computerScore_span.textContent = computerScore;
    roundNumber_span.textContent = roundNumber;
}

// Win condition
function win(user, computer) {
    userScore++;
    roundNumber++;
    updateScores();
    
    const userChoiceDiv = document.getElementById(user);
    userChoiceDiv.classList.add('winningStyles');
    
    // Update displays
    playerChoiceDisplay.innerHTML = gameIcons[user];
    computerChoiceDisplay.innerHTML = gameIcons[computer];
    playerChoiceDisplay.classList.add('winningStyles');
    computerChoiceDisplay.classList.add('losingStyles');
    
    // Animation
    setTimeout(() => {
        userChoiceDiv.classList.remove('winningStyles');
        playerChoiceDisplay.classList.remove('winningStyles');
        computerChoiceDisplay.classList.remove('losingStyles');
    }, 1000);
    
    // Result message
    const winMessages = [
        `${convertCase(user)} beats ${convertCase(computer)}. You win!`,
        `${convertCase(computer)} is no match for ${convertCase(user)}!`,
        `Victory! ${convertCase(user)} triumphs over ${convertCase(computer)}!`,
        `You outsmarted the computer with ${convertCase(user)}!`
    ];
    const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
    result_div.innerHTML = `<p>${randomMessage}</p>`;
    actionMessage_p.textContent = 'Keep it going!';
}

// Lose condition
function loses(user, computer) {
    computerScore++;
    roundNumber++;
    updateScores();
    
    const userChoiceDiv = document.getElementById(user);
    userChoiceDiv.classList.add('losingStyles');
    
    // Update displays
    playerChoiceDisplay.innerHTML = gameIcons[user];
    computerChoiceDisplay.innerHTML = gameIcons[computer];
    playerChoiceDisplay.classList.add('losingStyles');
    computerChoiceDisplay.classList.add('winningStyles');
    
    // Animation
    setTimeout(() => {
        userChoiceDiv.classList.remove('losingStyles');
        playerChoiceDisplay.classList.remove('losingStyles');
        computerChoiceDisplay.classList.remove('winningStyles');
    }, 1000);
    
    // Result message
    const loseMessages = [
        `${convertCase(computer)} beats ${convertCase(user)}. You lose!`,
        `The computer's ${convertCase(computer)} defeated your ${convertCase(user)}!`,
        `Defeat! ${convertCase(computer)} is superior to ${convertCase(user)}!`,
        `The computer outplayed you with ${convertCase(computer)}!`
    ];
    const randomMessage = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    result_div.innerHTML = `<p>${randomMessage}</p>`;
    actionMessage_p.textContent = 'Try again!';
}

// Draw condition
function draw(user, computer) {
    roundNumber++;
    updateScores();
    
    const userChoiceDiv = document.getElementById(user);
    userChoiceDiv.classList.add('drawStyles');
    
    // Update displays
    playerChoiceDisplay.innerHTML = gameIcons[user];
    computerChoiceDisplay.innerHTML = gameIcons[computer];
    playerChoiceDisplay.classList.add('drawStyles');
    computerChoiceDisplay.classList.add('drawStyles');
    
    // Animation
    setTimeout(() => {
        userChoiceDiv.classList.remove('drawStyles');
        playerChoiceDisplay.classList.remove('drawStyles');
        computerChoiceDisplay.classList.remove('drawStyles');
    }, 1000);
    
    // Result message
    const drawMessages = [
        `It's a draw! Both chose ${convertCase(user)}.`,
        `Tie game! You both selected ${convertCase(user)}.`,
        `No winner this round - both played ${convertCase(user)}.`,
        `A stalemate with ${convertCase(user)}!`
    ];
    const randomMessage = drawMessages[Math.floor(Math.random() * drawMessages.length)];
    result_div.innerHTML = `<p>${randomMessage}</p>`;
    actionMessage_p.textContent = 'Make your next move!';
}

// Core game logic
function game(userChoice) {
    const computerChoice = getComputerChoice();
    
    // Show choices with a slight delay for better UX
    playerChoiceDisplay.innerHTML = gameIcons[userChoice];
    setTimeout(() => {
        computerChoiceDisplay.innerHTML = gameIcons[computerChoice];
        
        // Determine winner after both choices are displayed
        setTimeout(() => {
            determineWinner(userChoice, computerChoice);
        }, 300);
    }, 300);
}

// Determine winner based on game mode
function determineWinner(user, computer) {
    if (user === computer) {
        draw(user, computer);
        return;
    }
    
    if (gameMode === 'classic') {
        // Classic mode rules
        if (
            (user === 'rock' && computer === 'scissors') ||
            (user === 'paper' && computer === 'rock') ||
            (user === 'scissors' && computer === 'paper')
        ) {
            win(user, computer);
        } else {
            loses(user, computer);
        }
    } else {
        // Extended mode rules (Rock-Paper-Scissors-Lizard-Spock)
        const winConditions = {
            rock: ['scissors', 'lizard'],
            paper: ['rock', 'spock'],
            scissors: ['paper', 'lizard'],
            lizard: ['paper', 'spock'],
            spock: ['rock', 'scissors']
        };
        
        if (winConditions[user].includes(computer)) {
            win(user, computer);
        } else {
            loses(user, computer);
        }
    }
}

// Reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundNumber = 1;
    updateScores();
    
    playerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    
    result_div.innerHTML = `<p>Game reset! Choose your weapon to begin.</p>`;
    actionMessage_p.textContent = 'Make your move!';
}

// Show rules modal
function showRules() {
    rulesModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Hide rules modal
function hideRules() {
    rulesModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
