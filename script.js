const startDate = new Date("2026-02-06");

function updateTimer() {
    const now = new Date();
    let diff = now - startDate;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    document.getElementById("years").innerText = Math.floor(days / 365);
    document.getElementById("months").innerText = Math.floor((days % 365) / 30);
    document.getElementById("days").innerText = days % 30;
    document.getElementById("hours").innerText = hours % 24;
    document.getElementById("minutes").innerText = minutes % 60;
    document.getElementById("seconds").innerText = seconds % 60;
}
setInterval(updateTimer, 1000);
updateTimer();

function openLetter(type) {
    let text = "";

    if(type === "sad") {
        text = text = "Don't feel too sad i'm always here for you ❤️";
    } else if (type === "miss") {
        text = "I miss you too more than words i can explain 💖";
    } else {
        text = "You don't need to overthink too much no need to be afraid of losing me 💖";
    }

    document.getElementById("letter-text").innerText = text;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

let currentIndex = 0;
let images;
window.onload = () => {
    images = document.querySelectorAll(".polaroid img");
};

function openImage(el) {
    const src = el.querySelector("img").src;

    currentIndex = Array.from(images).findIndex(img => img.src === src);

    const viewer = document.getElementById("image-viewer");
    const viewerImg = document.getElementById("viewer-img");

    viewer.style.display = "flex";
    viewerImg.style.opacity = 0;

    setTimeout(() => {
        viewerImg.src = src;
        viewerImg.style.opacity = 1;
    }, 150);
}

function closeImage() {
    document.getElementById("image-viewer").style.display = "none";
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    const viewerImg = document.getElementById("viewer-img");

    viewerImg.style.opacity = 0;
    viewerImg.style.transform = "scale(0.95)";

    setTimeout(() => {
        viewerImg.src = images[currentIndex].src;
        viewerImg.style.opacity = 1;
        viewerImg.style.transform = "scale(1)";
    }, 200);
}

document.getElementById("image-viewer").addEventListener("click", function(e) {
    if (e.target.id === "image-viewer") {
        closeImage();
    }
});

document.addEventListener("keydown", (e) => {
    if (document.getElementById("image-viewer").style.display === "flex") {
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "Escape") closeImage();
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 400);

const text = "You are my peace, my safe place. It feels comfortable when talking to you, the most beautiful part that has come to my life. I know you care for me a little bit too much because of my childish side, but aside from that, you still love me. That's the most loving part of you because you accept me for who I am. 💖";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("final-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}
typeWriter();