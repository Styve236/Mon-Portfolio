// --- Configuration & State ---
const projectsData = {
    stockly: {
        title: "Stockly",
        image: "assets/stockly.webp",
        desc: "Système de gestion d'inventaire complet permettant le suivi des stocks en temps réel. Développé pour optimiser les flux logistiques des petites et moyennes entreprises.",
        stack: ["PHP (PDO)", "MySQL", "Bootstrap", "Chart.js"],
        github: "#",
        demo: "#"
    },
    honyhub: {
        title: "HonyHub",
        image: "assets/honyhub.webp",
        desc: "Plateforme e-commerce modulaire avec une interface d'administration robuste. Gestion des produits, des commandes et des avis clients intégrée.",
        stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
        github: "#",
        demo: "#"
    },
    pressing: {
        title: "Pressing App",
        image: "assets/pressing.webp",
        desc: "Application métier pour la gestion de blanchisserie. Inclut un système de notifications automatisé via l'API WhatsApp pour informer les clients de l'état de leurs commandes.",
        stack: ["JavaScript", "WhatsApp API", "CSS Grid", "MySQL"],
        github: "#",
        demo: "#"
    },
    dashboard: {
        title: "Admin Dashboard",
        image: "assets/dashboard.webp",
        desc: "Tableau de bord d'analyse de données en temps réel. Visualisation des indicateurs clés de performance (KPI) via des graphiques interactifs.",
        stack: ["PHP", "AJAX", "Chart.js", "SVG"],
        github: "#",
        demo: "#"
    }
};

// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme from local storage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
}

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("open");
        nav.classList.remove("active");
    });
});

// --- Typewriter Effect ---
const typewriterElement = document.getElementById('typewriter');
const words = ["solutions web robustes.", "interfaces intuitives.", "systèmes performants.", "expériences modernes."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// --- Particle Background ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Modal Logic ---
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const project = projectsData[projectId];
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${project.image}" alt="${project.title}">
                <h2 style="margin-top: 20px;">${project.title}</h2>
            </div>
            <div class="modal-desc" style="margin: 20px 0;">
                <p>${project.desc}</p>
            </div>
            <div class="modal-stack" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                ${project.stack.map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
            <div class="modal-links" style="display: flex; gap: 20px;">
                <a href="${project.github}" class="btn btn-primary">GitHub</a>
                <a href="${project.demo}" class="btn btn-secondary">Démo Live</a>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// --- Scroll Reveal ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal();

// --- Nav Highlight ---
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
