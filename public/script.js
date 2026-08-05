// ============================================
// CAROUSEL SLIDER - 5 Slides
// ============================================

const slider = document.querySelector('.carousel-slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = slides.length; // 5

function updateSlider(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider(currentIndex);
}

// ===== EVENT LISTENERS =====
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// ===== AUTO PLAY =====
let autoPlay = setInterval(nextSlide, 5000);

const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
carousel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

console.log('🚗 Om Auto Consultant Loaded! (5 Slides)');