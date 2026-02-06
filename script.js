// Page elements
const questionPage = document.getElementById('questionPage');
const menuPage = document.getElementById('menuPage');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// Floating button animation
let animationFrameId;
let noButtonX = 0;
let noButtonY = 0;
let velocityX = 2;
let velocityY = 2;
const buttonSpeed = 2;

// Initialize button position
function initNoButtonPosition() {
  const container = document.querySelector('.buttons-container');
  const containerRect = container.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  
  // Start at a random position within the container area
  noButtonX = Math.random() * (window.innerWidth - buttonRect.width);
  noButtonY = Math.random() * (window.innerHeight - buttonRect.height);
  
  // Ensure it's not too close to the Yes button
  const yesButtonRect = yesButton.getBoundingClientRect();
  const minDistance = 150;
  
  if (Math.abs(noButtonX - yesButtonRect.left) < minDistance) {
    noButtonX = yesButtonRect.left + minDistance + buttonRect.width;
  }
  if (Math.abs(noButtonY - yesButtonRect.top) < minDistance) {
    noButtonY = yesButtonRect.top + minDistance + buttonRect.height;
  }
  
  noButton.style.left = `${noButtonX}px`;
  noButton.style.top = `${noButtonY}px`;
}

// Animate the floating No button
function animateNoButton() {
  const buttonRect = noButton.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Update position
  noButtonX += velocityX;
  noButtonY += velocityY;
  
  // Bounce off walls
  if (noButtonX <= 0 || noButtonX + buttonRect.width >= windowWidth) {
    velocityX *= -1;
    noButtonX = Math.max(0, Math.min(noButtonX, windowWidth - buttonRect.width));
  }
  
  if (noButtonY <= 0 || noButtonY + buttonRect.height >= windowHeight) {
    velocityY *= -1;
    noButtonY = Math.max(0, Math.min(noButtonY, windowHeight - buttonRect.height));
  }
  
  // Avoid Yes button (repel effect)
  const yesButtonRect = yesButton.getBoundingClientRect();
  const centerX = noButtonX + buttonRect.width / 2;
  const centerY = noButtonY + buttonRect.height / 2;
  const yesCenterX = yesButtonRect.left + yesButtonRect.width / 2;
  const yesCenterY = yesButtonRect.top + yesButtonRect.height / 2;
  
  const dx = centerX - yesCenterX;
  const dy = centerY - yesCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = 200;
  
  if (distance < minDistance) {
    // Repel from Yes button
    const angle = Math.atan2(dy, dx);
    velocityX = Math.cos(angle) * buttonSpeed * 1.5;
    velocityY = Math.sin(angle) * buttonSpeed * 1.5;
  }
  
  // Apply position
  noButton.style.left = `${noButtonX}px`;
  noButton.style.top = `${noButtonY}px`;
  
  // Add slight rotation for more natural movement
  const rotation = Math.sin(Date.now() / 500) * 5;
  noButton.style.transform = `rotate(${rotation}deg)`;
  
  animationFrameId = requestAnimationFrame(animateNoButton);
}

// Prevent clicking on No button
noButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  // Make it move away quickly when attempted to click
  velocityX = (Math.random() - 0.5) * 8;
  velocityY = (Math.random() - 0.5) * 8;
});

noButton.addEventListener('mouseenter', () => {
  // Move away when hovered
  velocityX = (Math.random() - 0.5) * 6;
  velocityY = (Math.random() - 0.5) * 6;
});

// Yes button click handler
yesButton.addEventListener('click', () => {
  // Stop the floating animation
  cancelAnimationFrame(animationFrameId);
  
  // Transition to menu page
  questionPage.classList.remove('active');
  setTimeout(() => {
    menuPage.classList.add('active');
  }, 300);
  
  // Confetti celebration effect
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1', '#8B1538']
    });
    
    // Additional burst after a delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1', '#8B1538']
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1', '#8B1538']
      });
    }, 300);
  }
});

// Initialize on page load
window.addEventListener('load', () => {
  initNoButtonPosition();
  animateNoButton();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Keep button within bounds
  const buttonRect = noButton.getBoundingClientRect();
  if (noButtonX + buttonRect.width > window.innerWidth) {
    noButtonX = window.innerWidth - buttonRect.width;
  }
  if (noButtonY + buttonRect.height > window.innerHeight) {
    noButtonY = window.innerHeight - buttonRect.height;
  }
  noButton.style.left = `${noButtonX}px`;
  noButton.style.top = `${noButtonY}px`;
});
