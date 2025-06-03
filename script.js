// Elements
const navLinks = document.querySelectorAll('.navbar ul li a');
const underline = document.querySelector('.navbar .underline');
const navbar = document.querySelector('.navbar');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navUl = document.querySelector('.navbar ul');
const menuClose = document.getElementById('menuClose');
const navOverlay = document.getElementById('navOverlay');

// Set initial underline under active link
function setUnderline(el) {
  const rect = el.getBoundingClientRect();
  const navRect = navbar.getBoundingClientRect();
  underline.style.left = (rect.left - navRect.left) + 'px';
  underline.style.width = rect.width + 'px';
}

// Initialize underline to active link
const activeLink = document.querySelector('.navbar ul li a.active') || navLinks[0];
setUnderline(activeLink);

// Nav link click handler
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    setUnderline(link);
    if (navUl.classList.contains('active')) {
      navUl.classList.remove('active');
      menuClose.classList.remove('show');
    }
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Open mobile menu
menuToggle.addEventListener('click', () => {
  navUl.classList.add('active');
  menuClose.classList.add('show');
});

// Close mobile menu
menuClose.addEventListener('click', () => {
  navUl.classList.remove('active');
  menuClose.classList.remove('show');
});

// Typed Text Effect
const typedTextSpan = document.getElementById('typed-text');
const textArray = ["Web Developer", "Android Developer", "Full-Stack Developer", "Creative Coder"];
const typingDelay = 100, erasingDelay = 50, newTextDelay = 1500;
let textArrayIndex = 0, charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex);
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Resize event for underline reposition
window.addEventListener('resize', () => {
  const currentActive = document.querySelector('.navbar ul li a.active');
  if (currentActive) setUnderline(currentActive);
});

// Scroll spy and animations
window.addEventListener('scroll', () => {
  let current = null;
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 10;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  if (!current) current = 'home';

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  const currentActive = document.querySelector('.navbar ul li a.active');
  if (currentActive) setUnderline(currentActive);

  // Animate elements
  document.querySelectorAll('[data-animate]').forEach(elem => {
    if (elem.getBoundingClientRect().top < window.innerHeight - 100) {
      elem.classList.add('active');
    }
  });
});

// Theme toggle
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Accessibility
menuToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    menuToggle.click();
  }
});
themeToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeToggle.click();
  }
});

// Animate progress bars
function animateProgressBars() {
  const skills = document.querySelectorAll('.progress');
  skills.forEach(skill => {
    if (skill.getBoundingClientRect().top < window.innerHeight - 100) {
      skill.style.width = skill.getAttribute('data-width');
    }
  });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// Filter Projects
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? 'flex' : 'none';
    });
  });
});

// Visitor Count
document.addEventListener("DOMContentLoaded", () => {
  const totalVisitorsEl = document.getElementById("totalVisitors");
  let visitorCount = localStorage.getItem("visitorCount");

  if (!visitorCount) {
    visitorCount = Math.floor(Math.random() * 4000) + 1000;
  } else {
    visitorCount = parseInt(visitorCount, 10) + Math.floor(Math.random() * 41) + 10;
  }

  localStorage.setItem("visitorCount", visitorCount);
  totalVisitorsEl.textContent = visitorCount.toLocaleString();
});

// Chart.js - Visitors Chart
function getPast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return days;
}

function generateFakeData(len) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 30 + 5));
}

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('visitorChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getPast7Days(),
      datasets: [{
        label: 'Visitors per day',
        data: generateFakeData(7),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
});

// EmailJS
emailjs.init('ccxwDxMgNFtDkfc7u'); // Replace with your actual EmailJS user ID

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = this;
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = '';
  formMessage.style.color = '';

  emailjs.sendForm('service_fwruvzq', 'template_onpmkx7', form)
    .then(() => {
      formMessage.style.color = 'green';
      formMessage.textContent = 'Message sent successfully! Thank you.';
      form.reset();
    }, () => {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Failed to send message. Please try again later.';
    });
});


