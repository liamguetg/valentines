// Constants
const CONFETTI_COLORS = ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1', '#8B1538'];
const PHOTO_CONFIG = [
  { photos: [1, 2, 3, 4], direction: 'up' },
  { photos: [5, 6, 7, 8], direction: 'down' },
  { photos: [9, 10, 11, 12], direction: 'up' },
  { photos: [13, 14, 15, 16], direction: 'down' },
  { photos: [17, 18, 19, 20], direction: 'up' },
  { photos: [21, 22, 23, 24], direction: 'down' }
];

const PHOTO_EXTENSIONS = {
  1: 'jpg', 2: 'jpg', 3: 'JPG', 4: 'jpg',
  5: 'jpg', 6: 'JPG', 7: 'jpg', 8: 'jpg',
  9: 'JPG', 10: 'jpeg', 11: 'png', 12: 'jpeg',
  13: 'jpeg', 14: 'jpeg', 15: 'jpeg', 16: 'jpeg',
  17: 'jpeg', 18: 'jpeg', 19: 'jpeg', 20: 'jpeg',
  21: 'jpeg', 22: 'png', 23: 'jpeg', 24: 'jpeg'
};

// DOM Elements
const questionPage = document.getElementById('questionPage');
const menuPage = document.getElementById('menuPage');
const sharedPhotoBackground = document.getElementById('sharedPhotoBackground');

// Initialize photo columns
function createPhotoColumns() {
  PHOTO_CONFIG.forEach(({ photos, direction }) => {
    const column = document.createElement('div');
    column.className = `photo-column scroll-${direction}`;

    // Create 8 photos (4 original + 4 duplicates for seamless loop)
    [...photos, ...photos].forEach(photoNum => {
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      const ext = PHOTO_EXTENSIONS[photoNum];
      photoItem.style.backgroundImage = `url('./images/photo${photoNum}.${ext}')`;
      column.appendChild(photoItem);
    });

    sharedPhotoBackground.appendChild(column);
  });
}

// Function to handle transition to menu page
function goToMenuPage() {
  if (!questionPage || !menuPage) return;

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
      colors: CONFETTI_COLORS
    });

    // Additional burst after a delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: CONFETTI_COLORS
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: CONFETTI_COLORS
      });
    }, 300);
  }
}

// Event delegation for button clicks
document.addEventListener('click', (e) => {
  if (e.target.matches('.yes-button[data-action="go-to-menu"]')) {
    goToMenuPage();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  createPhotoColumns();
});
