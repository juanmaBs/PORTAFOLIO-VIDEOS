```javascript
/* =========================================================
   JUAN MANUEL BELLO — PORTFOLIO JS
   ========================================================= */


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================
   COUNTERS
   ========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1500;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress =
                    Math.min((currentTime - startTime) / duration, 1);

                const ease =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * ease);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.6
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});


/* =========================
   VIDEO HOVER PLAY
   ========================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    const video = card.querySelector("video");

    if (!video) return;

    card.addEventListener("mouseenter", () => {

        video.currentTime = 0;

        video.play().catch(() => {});

    });

    card.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

    });

});


/* =========================
   CUSTOM CURSOR
   ========================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});


function animateFollower() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateFollower);

}

animateFollower();


/* =========================
   CURSOR HOVER
   ========================= */

const interactiveElements =
    document.querySelectorAll("a, .service-card, .project-card");

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        follower.style.width = "55px";
        follower.style.height = "55px";

    });

    element.addEventListener("mouseleave", () => {

        follower.style.width = "35px";
        follower.style.height = "35px";

    });

});


/* =========================
   PARALLAX HERO
   ========================= */

const heroVisual =
    document.querySelector(".hero-visual");

document.addEventListener("mousemove", (event) => {

    if (!heroVisual) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 20;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 20;

    heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* =========================
   NAVBAR BACKGROUND
   ========================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(7,7,7,.72)";

        navbar.style.backdropFilter =
            "blur(18px)";

        navbar.style.border =
            "1px solid rgba(255,255,255,.07)";

        navbar.style.borderRadius =
            "100px";

        navbar.style.padding =
            "0 20px";

    } else {

        navbar.style.background =
            "transparent";

        navbar.style.backdropFilter =
            "none";

        navbar.style.border =
            "none";

        navbar.style.borderRadius =
            "0";

        navbar.style.padding =
            "0 5px";

    }

});


/* =========================
   SMOOTH ANCHOR OFFSET
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================
   REDUCE MOTION
   ========================= */

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}
```
