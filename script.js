// Typing effect for hero section
const text = "Hi, I'm Prit Italiya";
let index = 0;
const typingElement = document.getElementById("typing-effect");
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.innerHTML = "|"; // Cursor character
typingElement.appendChild(cursor);

function typeText() {
    if (index < text.length) {
        typingElement.innerHTML = text.substring(0, index + 1) + cursor.outerHTML;
        index++;
        setTimeout(typeText, 100); // Adjust typing speed here (100 ms)
    } else {
        setTimeout(() => {
            index = 0;
            typingElement.innerHTML = ""; // Clear the text
            typeText(); // Restart typing
        }, 2000); // Pause before starting over
    }
}

typeText();

// Cursor blinking effect
setInterval(() => {
    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
}, 500); // Cursor blink speed (500 ms)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const experienceSection = document.getElementById('work-experience');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(experienceSection);
});
