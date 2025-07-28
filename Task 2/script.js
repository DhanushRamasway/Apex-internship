// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form submission with enhanced validation
document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    position: document.getElementById("position").value.trim(),
    startDate: document.getElementById("startDate").value,
    skills: document.getElementById("skills").value.trim(),
    address: document.getElementById("address").value.trim(),
    resume: document.getElementById("resume").files[0]
  };

  // Validation
  if (!formData.firstName || !formData.lastName) {
    showAlert("Please enter both first and last name.", "error");
    return;
  }

  if (!isValidEmail(formData.email)) {
    showAlert("Please enter a valid email address.", "error");
    return;
  }

  if (!isValidPhone(formData.phone)) {
    showAlert("Please enter a valid 10-digit phone number.", "error");
    return;
  }

  if (!formData.position) {
    showAlert("Please specify the position you're applying for.", "error");
    return;
  }

  if (!formData.startDate) {
    showAlert("Please select your preferred start date.", "error");
    return;
  }

  if (!formData.skills) {
    showAlert("Please list your key skills.", "error");
    return;
  }

  if (!formData.address) {
    showAlert("Please provide your current address.", "error");
    return;
  }

  if (!formData.resume) {
    showAlert("Please upload your resume in PDF format.", "error");
    return;
  }

  if (formData.resume.type !== "application/pdf") {
    showAlert("Resume must be in PDF format only.", "error");
    return;
  }

  if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
    showAlert("Resume file size must be less than 5MB.", "error");
    return;
  }

  // Success
  showAlert("🎉 Your application has been submitted successfully! We'll review your application and get back to you within 2-3 business days.", "success");
  
  // Reset form
  this.reset();
  
  // Add some celebration animation
  celebrateSubmission();
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Indian format)
function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return phoneRegex.test(cleanPhone);
}

// Enhanced alert system
function showAlert(message, type = 'info') {
  // Remove existing alerts
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement('div');
  alert.className = `custom-alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <div class="alert-icon">
        ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </div>
      <div class="alert-message">${message}</div>
      <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add styles
  alert.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10000;
    background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
    color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
    border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
    border-radius: 15px;
    padding: 1rem;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
    backdrop-filter: blur(10px);
  `;

  const alertContent = alert.querySelector('.alert-content');
  alertContent.style.cssText = `
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  `;

  const alertIcon = alert.querySelector('.alert-icon');
  alertIcon.style.cssText = `
    font-size: 1.2rem;
    flex-shrink: 0;
  `;

  const alertMessage = alert.querySelector('.alert-message');
  alertMessage.style.cssText = `
    flex: 1;
    line-height: 1.4;
  `;

  const alertClose = alert.querySelector('.alert-close');
  alertClose.style.cssText = `
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    flex-shrink: 0;
  `;

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(alert);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => alert.remove(), 300);
    }
  }, 5000);
}

// Celebration animation
function celebrateSubmission() {
  // Create confetti effect
  for (let i = 0; i < 50; i++) {
    createConfetti();
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]};
    top: -10px;
    left: ${Math.random() * 100}vw;
    z-index: 10000;
    border-radius: 50%;
    pointer-events: none;
    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 5000);
}

// File upload enhancement
document.getElementById('resume').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const label = document.querySelector('.file-upload-label span');
  
  if (file) {
    label.textContent = `Selected: ${file.name}`;
    label.style.color = '#22c55e';
  } else {
    label.textContent = 'Choose PDF file or drag and drop';
    label.style.color = '#667eea';
  }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    if (this.type === 'submit') {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      this.disabled = true;
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.job-card, .value-card, .stat-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // Add fadeInUp animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});