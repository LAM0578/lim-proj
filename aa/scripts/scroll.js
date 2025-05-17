let currentIndex = 0;
let scale = 1;
const images = document.querySelectorAll('.image-container img');
const imageContainer = document.querySelector('.image-container');
const isFireFox = navigator.userAgent.toLowerCase().includes('firefox');

function showImage(index, isRefresh) {
    if (isFireFox) {
        if (isRefresh) {
            imageContainer.style.transition = 'none';
        }
        else {
            imageContainer.style = '';
        }
        imageContainer.style.transform = `translateX(${-532 * index * scale}px)`;
    }
    else {
        imageContainer.style.transform = `translateX(${-index * 100}%)`;
    }
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex, false);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex, false);
}

function resize() {
    scale = Math.min(Math.max(window.innerWidth / 532, 0.667), 1);
    images.forEach((img, i) => {
        img.style.width = `${532 * scale}px`;
    })
    showImage(currentIndex, true);
}

showImage(currentIndex);

if (isFireFox) {
    resize();
    window.addEventListener('resize', resize);
}