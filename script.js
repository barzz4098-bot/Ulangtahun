
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let musicPlaying = false;

async function playMusic() {
  try {
    await music.play();
    musicPlaying = true;
    musicIcon.textContent = "♫";
    musicText.textContent = "Playing";
  } catch (error) {
    musicPlaying = false;
    musicIcon.textContent = "♫";
    musicText.textContent = "Play Music";
  }
}

function pauseMusic() {
  music.pause();
  musicPlaying = false;
  musicIcon.textContent = "♫";
  musicText.textContent = "Play Music";
}

musicButton.addEventListener("click", () => {
  if (musicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Browser dapat memblokir autoplay dengan suara.
// Musik akan dicoba saat halaman dibuka dan bisa dimulai
// melalui tombol musik jika autoplay diblokir.
window.addEventListener("load", () => {
  playMusic();
});


// COUNTDOWN
const birthdayDate = new Date("December 14, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = birthdayDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// MONTHLY ENVELOPES
const monthButtons = document.querySelectorAll(".month-envelope");
const monthMessage = document.getElementById("monthMessage");

monthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.dataset.message;

    monthMessage.innerHTML = `
      <span>♡</span>
      <p>${message}</p>
    `;

    monthButtons.forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
  });
});


// GIFT AND LETTER ANIMATION
const giftBox = document.getElementById("giftBox");
const giftButton = document.getElementById("giftButton");
const giftLetter = document.getElementById("giftLetter");

let giftOpened = false;
let letterOpened = false;

giftButton.addEventListener("click", () => {
  if (!giftOpened) {
    giftBox.classList.add("open");
    giftOpened = true;
    giftButton.textContent = "Buka Surat ♡";
    return;
  }

  if (!letterOpened) {
    giftLetter.classList.add("show");
    letterOpened = true;
    giftButton.textContent = "Surat Terbuka ♡";
  }
});


// BACK TO TOP
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// SCROLL REVEAL
const revealElements = document.querySelectorAll(
  ".appreciation-card, .wish-card, .little-card, .month-envelope"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(25px)";
  element.style.transition = "opacity .7s ease, transform .7s ease";
  revealObserver.observe(element);
});
