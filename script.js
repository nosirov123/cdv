const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isBoardLocked = false; // yangi flag

// Card data (emojis for simplicity; you can replace with images)
const cardValues = ['😺', '😺', '🐶', '🐶', '🐘', '🐘', '🦒', '🦒', '🦁', '🦁', '🐻', '🐻', '🐵', '🐵', '🐼', '🐼'];

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create game board
function createBoard() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    const shuffledValues = shuffle([...cardValues]);

    shuffledValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = value;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
        cards.push(card);
    });
}

// Flip card logic
function flipCard(card) {
    if (
        isBoardLocked ||
        flippedCards.includes(card) ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched')
    ) {
        return;
    }
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        isBoardLocked = true;
        checkMatch();
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        isBoardLocked = false;
        if (matchedPairs === cardValues.length / 2) {
            setTimeout(() => alert('Tabriklaymiz! Siz o‘yinda g‘alaba qozondingiz!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isBoardLocked = false;
        }, 1000);
    }
}

// Restart game
restartBtn.addEventListener('click', createBoard);

// Initialize game
createBoard();