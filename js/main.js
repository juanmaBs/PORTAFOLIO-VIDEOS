document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }
    setTimeout(() => revealElements.forEach(el => el.classList.add("visible")), 2200);

    const counters = document.querySelectorAll(".counter");
    const animateCounter = counter => {
        const target = Number(counter.dataset.target) || 0;
        const duration = 1400;
        const start = performance.now();
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else counter.textContent = target;
        };
        requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    } else {
        counters.forEach(counter => counter.textContent = counter.dataset.target || "0");
    }

    const projectCards = document.querySelectorAll(".project-card");
    const videos = document.querySelectorAll(".portfolio-video");
    videos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
    });

    projectCards.forEach(card => {
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

    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting && window.innerWidth <= 900) video.play().catch(() => {});
                else if (!entry.isIntersecting) video.pause();
            });
        }, { threshold: 0.35 });
        videos.forEach(video => videoObserver.observe(video));
    }

    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalClose = document.getElementById("modalClose");
    const modalBackground = document.querySelector(".modal-background");

    function closeModal() {
        if (!modal || !modalVideo) return;
        modal.classList.remove("active");
        modalVideo.pause();
        modalVideo.removeAttribute("src");
        modalVideo.load();
        document.body.style.overflow = "";
    }

    if (modal && modalVideo) {
        document.querySelectorAll(".play-project").forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                const card = button.closest(".project-card");
                const video = card?.querySelector("video");
                const source = video?.querySelector("source");
                if (!source) return;
                modalVideo.src = source.src;
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
                modalVideo.currentTime = 0;
                modalVideo.play().catch(() => {});
            });
        });
        modalClose?.addEventListener("click", closeModal);
        modalBackground?.addEventListener("click", closeModal);
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && modal.classList.contains("active")) closeModal();
        });
    }

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    if (cursor && follower && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
        document.addEventListener("mousemove", event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        document.querySelectorAll("a, button, .service-card, .project-card").forEach(el => {
            el.addEventListener("mouseenter", () => {
                follower.style.width = "55px";
                follower.style.height = "55px";
            });
            el.addEventListener("mouseleave", () => {
                follower.style.width = "35px";
                follower.style.height = "35px";
            });
        });
    }

    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", event => {
            if (window.innerWidth <= 900) return;
            const x = (event.clientX / window.innerWidth - 0.5) * 15;
            const y = (event.clientY / window.innerHeight - 0.5) * 15;
            heroVisual.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    const navbar = document.querySelector(".navbar");
    const updateNavbar = () => {
        if (!navbar) return;
        const scrolled = window.scrollY > 40;
        navbar.style.background = scrolled ? "rgba(7,7,7,.72)" : "transparent";
        navbar.style.backdropFilter = scrolled ? "blur(18px)" : "none";
        navbar.style.border = scrolled ? "1px solid rgba(255,255,255,.07)" : "none";
        navbar.style.borderRadius = scrolled ? "100px" : "0";
        navbar.style.padding = scrolled ? "0 20px" : "0 5px";
    };
    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.style.scrollBehavior = "auto";
    }

    document.body.classList.add("page-loaded");
});
