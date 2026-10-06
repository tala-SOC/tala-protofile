/* =========================================
TALA AMMAR — PORTFOLIO SCRIPT
Cybersecurity × Web Development
========================================= */

/* =========================================
NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {
if (!navbar) {
    return;
}

if (window.scrollY > 40) {

    navbar.style.background = "rgba(5, 5, 5, 0.92)";
    navbar.style.borderBottomColor =
        "rgba(212, 175, 55, 0.18)";

} else {

    navbar.style.background = "rgba(5, 5, 5, 0.72)";
    navbar.style.borderBottomColor =
        "rgba(212, 175, 55, 0.10)";
}

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();

/* =========================================
SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
".section, .project-card, .skill-card, .stat-card, .education-card"
);

if ("IntersectionObserver" in window) {

const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});

} else {

/* Fallback for older browsers */

revealElements.forEach((element) => {
    element.classList.add("visible");
});


}

/* =========================================
ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNavigation() {

let currentSection = "";

sections.forEach((section) => {

    const sectionTop =
        section.offsetTop - 180;

    const sectionBottom =
        sectionTop + section.offsetHeight;

    if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
    ) {
        currentSection =
            section.getAttribute("id");
    }

});


navLinks.forEach((link) => {

    link.classList.remove("active");

    const target =
        link.getAttribute("href");

    if (target === `#${currentSection}`) {

        link.classList.add("active");

    }

});

}

window.addEventListener(
"scroll",
updateActiveNavigation
);

window.addEventListener(
"load",
updateActiveNavigation
);

updateActiveNavigation();

/* =========================================
SMOOTH NAVIGATION
========================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach((link) => {
    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});

/* =========================================
PROJECT CARD TILT EFFECT
========================================= */

const projectCards =
document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

card.addEventListener(
    "mousemove",
    (event) => {

        /*
         * Disable tilt on smaller screens.
         */

        if (window.innerWidth < 900) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -1.2;

        const rotateY =
            ((x - centerX) / centerX) * 1.2;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    }
);


card.addEventListener(
    "mouseleave",
    () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    }
);


});

/* =========================================
CURRENT YEAR
========================================= */

const yearElements =
document.querySelectorAll(
"footer p:first-child"
);

yearElements.forEach((element) => {
element.textContent =
    `© ${new Date().getFullYear()} Tala Ammar`;
});

/* =========================================
EXTERNAL LINKS
========================================= */

const externalLinks =
document.querySelectorAll(
'a[target="_blank"]'
);

externalLinks.forEach((link) => {

```
link.setAttribute(
    "rel",
    "noopener noreferrer"
);
```

});

/* =========================================
CONSOLE MESSAGE
========================================= */

console.log(
"%c🛡️ Tala Ammar | Secure Web Development",
"color: #d4af37; font-size: 18px; font-weight: bold;"
);

console.log(
"%cCybersecurity × Web Development",
"color: #aaa; font-size: 13px;"
);

console.log(
"%cBuilding practical web applications with security in mind.",
"color: #aaa; font-size: 13px;" 
);