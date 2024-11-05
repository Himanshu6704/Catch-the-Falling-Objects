const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');

let score = 0;
let basketPosition = 120; // Initial position of the basket

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20; // Move left
        basket.style.left = basketPosition + 'px';
    } else if (event.key === 'ArrowRight' && basketPosition < 240) {
        basketPosition += 20; // Move right
        basket.style.left = basketPosition + 'px';
    }
});

// Function to create falling objects
function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = Math.random() * 270 + 'px'; // Random horizontal position
    gameArea.appendChild(object);

    let objectPosition = 0;
    const fallInterval = setInterval(() => {
        if (objectPosition < 500) {
            objectPosition += 6; // Speed of falling
            object.style.top = objectPosition + 'px';

            // Check for collision with the basket
            if (objectPosition > 470 && 
                parseInt(object.style.left) >= basketPosition && 
                parseInt(object.style.left) <= basketPosition + 60) {
                score++;
                scoreDisplay.textContent = score;
                clearInterval(fallInterval);
                gameArea.removeChild(object);
            }
        } else {
            clearInterval(fallInterval);
            gameArea.removeChild(object);
        }
    }, 100);
}

// Start the game
setInterval(createFallingObject, 1000); // Create a new object every second
