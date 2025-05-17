let currentIndex = 0;
const images = document.querySelectorAll('.image-container img');

function showImage(index) {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.style.transform = `translateX(${-index * 532}px)`;
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

showImage(currentIndex);