
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navItems.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Interactive project tilt
const projectCards = document.querySelectorAll("[data-tilt]");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 5;
    const rotateX = (0.5 - y) * 5;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Animated background particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];
const particleCount = window.innerWidth < 600 ? 35 : 65;

function resizeCanvas() {
  width = canvas.width = window.innerWidth * window.devicePixelRatio;
  height = canvas.height = window.innerHeight * window.devicePixelRatio;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(
    window.devicePixelRatio, 0, 0,
    window.devicePixelRatio, 0, 0
  );

  width = window.innerWidth;
  height = window.innerHeight;
}

function createParticles() {
  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.4,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    opacity: Math.random() * 0.5 + 0.1
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(213, 173, 101, ${particle.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

// Subtle 3D gold object using Three.js
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  1,
  0.1,
  100
);
camera.position.z = 5.4;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(440, 440);
renderer.setClearColor(0x000000, 0);

const visualContainer = document.querySelector(".orbital-scene");
visualContainer.appendChild(renderer.domElement);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.inset = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.pointerEvents = "none";
renderer.domElement.style.zIndex = "1";

// Gold wireframe geometry
const geometry = new THREE.IcosahedronGeometry(1.12, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xd5ad65,
  metalness: 0.85,
  roughness: 0.27,
  wireframe: true,
  transparent: true,
  opacity: 0.68
});

const object3D = new THREE.Mesh(geometry, material);
scene.add(object3D);

// Inner solid core
const innerGeometry = new THREE.IcosahedronGeometry(0.64, 1);
const innerMaterial = new THREE.MeshStandardMaterial({
  color: 0x342716,
  metalness: 0.75,
  roughness: 0.32,
  transparent: true,
  opacity: 0.5
});

const innerObject = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerObject);

// Lighting
const goldLight = new THREE.PointLight(0xe6bd74, 22);
goldLight.position.set(2, 2, 3);
scene.add(goldLight);

const softLight = new THREE.PointLight(0x8b672e, 12);
softLight.position.set(-3, -2, 2);
scene.add(softLight);

scene.add(new THREE.AmbientLight(0xffffff, 1.1));

// Animate the 3D object
const clock = new THREE.Clock();

function animate3D() {
  requestAnimationFrame(animate3D);

  const elapsed = clock.getElapsedTime();

  object3D.rotation.x = elapsed * 0.12;
  object3D.rotation.y = elapsed * 0.2;

  innerObject.rotation.x = -elapsed * 0.1;
  innerObject.rotation.y = elapsed * 0.14;

  renderer.render(scene, camera);
}

animate3D();

// Keep renderer sized to its container
function resize3D() {
  const size = visualContainer.clientWidth;
  if (!size) return;

  camera.aspect = 1;
  camera.updateProjectionMatrix();
  renderer.setSize(size, size, false);
}

window.addEventListener("resize", resize3D);
resize3D();
