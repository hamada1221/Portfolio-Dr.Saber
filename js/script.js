let surgicalProgress = document.querySelector(".surgical-precision"),
  surgicalValue = document.querySelector(".surgical-progress");

let surgicalStartValue = 0,
  surgicalEndValue = 95,
  surgicalSpeed = 50;

let progressSurgical = setInterval(() => {
  surgicalStartValue++;
  surgicalValue.textContent = `${surgicalStartValue}%`;
  surgicalProgress.style.background = `conic-gradient(#fca61f ${surgicalStartValue * 3.6}deg, #ededed 0deg)`;
  if (surgicalStartValue == surgicalEndValue) {
    clearInterval(progressSurgical);
  }
}, surgicalSpeed);

let patientCareProgress = document.querySelector(".patient-care"),
  patientCareValue = document.querySelector(".patient-care-progress");

let patientCareStartValue = 0,
  patientCareEndValue = 100,
  patientCareSpeed = 50;

let progressPatientCare = setInterval(() => {
  patientCareStartValue++;
  patientCareValue.textContent = `${patientCareStartValue}%`;
  patientCareProgress.style.background = `conic-gradient(#7d2ae8 ${patientCareStartValue * 3.6}deg, #ededed 0deg)`;
  if (patientCareStartValue == patientCareEndValue) {
    clearInterval(progressPatientCare);
  }
}, patientCareSpeed);

// Memory Game Logic
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flipped');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  matchedPairs++;
  if (matchedPairs === cards.length / 2) {
    setTimeout(() => triggerConfetti(), 500);
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  firstCard.classList.add('shake');
  secondCard.classList.add('shake');
  setTimeout(() => {
    firstCard.classList.remove('flipped', 'shake');
    secondCard.classList.remove('flipped', 'shake');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));
shuffleCards();

// Confetti Effect
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#fca61f', '#6f34fe', '#20c997']
  });
}

// Include confetti library
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(script);

// Sticky Navbar Logic
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById('navbar-top');
  const body = document.body;
  let navbarHeight = navbar.offsetHeight;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('fixed-top');
      body.style.paddingTop = navbarHeight + 'px';
    } else {
      navbar.classList.remove('fixed-top');
      body.style.paddingTop = '0';
    }
  });

  // Reset padding when navbar collapse is closed
  const navbarCollapse = document.querySelector('#navbarNav');
  navbarCollapse.addEventListener('hidden.bs.collapse', function () {
    if (!navbar.classList.contains('fixed-top')) {
      body.style.paddingTop = '0';
    }
    AOS.refresh(); // Refresh AOS animations after navbar closes
  });
});

// Close navbar after clicking a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarToggler = document.querySelector('.nav-menu');
    const navbarCollapse = document.querySelector('#navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); // Simulate click on burger icon to close navbar
    }
  });
});

// Back to Top Button
let mybutton = document.getElementById("btn-back-to-top");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
mybutton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
    this.classList.add('active');
  });
});

// Contact
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("ikwsl4bYR9K8Ls84_");

  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      contactName: form.querySelector("#contactName").value.trim(),
      contactEmail: form.querySelector("#contactEmail").value.trim(),
      contactMobile: form.querySelector("#contactMobile").value.trim(),
      contactMessage: form.querySelector("#contactMessage").value.trim(),
    };

    if (
      !formData.contactName ||
      !formData.contactEmail ||
      !formData.contactMobile ||
      !formData.contactMessage
    ) {
      messageBox.innerHTML = '<i class="bi bi-x-circle me-2"></i>Please fill out all fields.';
      messageBox.className = "alert-error";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      messageBox.innerHTML = '<i class="bi bi-x-circle me-2"></i>Please enter a valid email address.';
      messageBox.className = "alert-error";
      return;
    }

    emailjs
      .send("service_yczq1g5", "template_h9y76jr", formData)
      .then(() => {
        messageBox.innerHTML = '<i class="bi bi-check-circle me-1"></i>Sent successfully';
        messageBox.className = "alert-success";
        form.reset();
      })
      .catch((error) => {
        messageBox.innerHTML = '<i class="bi bi-x-circle me-1"></i>Failed to send message';
        messageBox.className = "alert-error";
        console.error("EmailJS Error:", error);
      });
  });
});

