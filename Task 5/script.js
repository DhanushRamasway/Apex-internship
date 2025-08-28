// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Simple fake form submission
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent! Thank you.');
  e.target.reset();
});

// Fade-in animation for About section
window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about-container");
  if (!aboutSection) return;

  const sectionPos = aboutSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos) {
    aboutSection.classList.add("fade-in");
  }
});
