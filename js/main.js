document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SCROLL REVEAL
    // =========================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.05
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

        // Seguridad: mostrar todo después de 2 segundos
        setTimeout(function () {

            revealElements.forEach(function (element) {
                element.classList.add("visible");
            });

        }, 2000);

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    // =========================
    // COUNTERS
    // =========================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(function (counter) {

        const target = Number(counter.dataset.target) || 0;

        counter.textContent = target;

    });


    // =========================
    // PROJECT VIDEOS
    // =========================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        const video = card.querySelector("video");

        if (!video) return;

        video.muted = true;
        video.playsInline = true;

        card.addEventListener("mouseenter", function () {

            video.currentTime = 0;

            video.play().catch(function () {});

        });

        card.addEventListener("mouseleave", function () {

            video.pause();

            video.currentTime = 0;

        });

    });


    // =========================
    // CUSTOM CURSOR
    // =========================

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (cursor && follower) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

        });


        function animateFollower() {

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";

            requestAnimationFrame(animateFollower);

        }

        animateFollower();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .service-card, .project-card"
            );


        interactiveElements.forEach(function (element) {

            element.addEventListener("mouseenter", function () {

                follower.style.width = "55px";
                follower.style.height = "55px";

            });


            element.addEventListener("mouseleave", function () {

                follower.style.width = "35px";
                follower.style.height = "35px";

            });

        });

    }


    // =========================
    // HERO PARALLAX
    // =========================

    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual) {

        document.addEventListener("mousemove", function (event) {

            if (window.innerWidth <= 900) return;

            const x =
                (event.clientX / window.innerWidth - 0.5) * 15;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 15;

            heroVisual.style.transform =
                "translate(" + x + "px, " + y + "px)";

        });

    }


    // =========================
    // NAVBAR
    // =========================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.background = "rgba(7,7,7,.72)";
            navbar.style.backdropFilter = "blur(18px)";
            navbar.style.border =
                "1px solid rgba(255,255,255,.07)";
            navbar.style.borderRadius = "100px";
            navbar.style.padding = "0 20px";

        } else {

            navbar.style.background = "transparent";
            navbar.style.backdropFilter = "none";
            navbar.style.border = "none";
            navbar.style.borderRadius = "0";
            navbar.style.padding = "0 5px";

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    // =========================
    // SMOOTH SCROLL
    // =========================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {

            anchor.addEventListener("click", function (event) {

                const href = this.getAttribute("href");

                if (!href || href === "#") return;

                const target = document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            });

        });


    // =========================
    // PAGE LOADED
    // =========================

    document.body.classList.add("page-loaded");

});
