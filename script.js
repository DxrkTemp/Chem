const startDate = new Date("2026-02-06");

let currentIndex = 0;
let currentVideoIndex = 0;
let images = [];
let videos = [];

function openLetter(type) {
    let text = "";

    if(type === "sad") {
        text = "Don't feel too sad i'm always here for you 💖";
    } else if (type === "miss") {
        text = "I miss you more than words can explain 💖";
    } else {
        text = "You don't need to overthink, I'm not going anywhere 💖";
    }

    document.getElementById("letter-text").innerText = text;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("modal").addEventListener("click", function(e) {
    if (e.target.id === "modal") {
        closeModal();
    }
});

window.onload = () => {
    images = [...document.querySelectorAll(".polaroid img")];
    videos = [...document.querySelectorAll(".video-card video")];

    updateTimer();
    typeWriter();
};

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

function updateCarousel() {
    const prevImg = document.getElementById("prev-img");
    const currentImg = document.getElementById("current-img");
    const nextImg = document.getElementById("next-img");

    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    let nextIndex = (currentIndex + 1) % images.length;

    prevImg.src = images[prevIndex].src;
    currentImg.src = images[currentIndex].src;
    nextImg.src = images[nextIndex].src;
}

function openImage(el) {
    const src = el.querySelector("img").src;

    currentIndex = images.findIndex(img => img.src === src);

    document.getElementById("image-viewer").style.display = "flex";

    updateCarousel();
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    updateCarousel();
}

function closeImage() {
    document.getElementById("image-viewer").style.display = "none";
}

function updateVideoCarousel() {
    const prev = document.getElementById("prev-video");
    const current = document.getElementById("current-video");
    const next = document.getElementById("next-video");

    let prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    let nextIndex = (currentVideoIndex + 1) % videos.length;

    current.pause();

    prev.src = videos[prevIndex].src;
    current.src = videos[currentVideoIndex].src;
    next.src = videos[nextIndex].src;

    prev.load();
    current.load();
    next.load();

    current.oncanplay = () => {
        current.play();
    };
}

function openVideo(el) {
    const src = el.querySelector("video").src;

    currentVideoIndex = videos.findIndex(v => v.src === src);

    const viewer = document.getElementById("video-viewer");
    viewer.style.display = "flex";

    updateVideoCarousel();
}

function changeVideo(direction) {
    currentVideoIndex += direction;

    if (currentVideoIndex < 0) currentVideoIndex = videos.length - 1;
    if (currentVideoIndex >= videos.length) currentVideoIndex = 0;

    updateVideoCarousel();
}

function closeVideo() {
    const viewer = document.getElementById("video-viewer");
    const current = document.getElementById("current-video");

    current.pause();
    viewer.style.display = "none";
}

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
    heart.style.fontSize = Math.random() * 10 + 10 + "px";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);

const text = "You are my peace, my safe place. It feels comfortable when talking to you, the most beautiful part that has come to my life. I know you care for me a little bit too much because of my childish side, but aside from that, you still love me. That's the most loving part of you because you accept me for who I am. 💖";

let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("final-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 35);
    }
}
