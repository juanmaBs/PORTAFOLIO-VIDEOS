/* =========================================================
   JUAN MANUEL BELLO — PORTFOLIO JS
   ========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });


        /* Seguridad:
           cualquier elemento que no haya sido detectado
           después de un tiempo se vuelve visible. */

        setTimeout(() => {

            revealElements.forEach((element) => {

                element.classList.add("visible");

            });

        }, 2500);

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.target) || 0;


                    let startTime = null;

                    const duration = 1500;


                    function updateCounter(timestamp) {

                        if (!startTime) {
                            startTime = timestamp;
                        }


                        const progress =
                            Math.min(
                                (timestamp - startTime) / duration,
                                1
                            );


                        const ease =
                            1 - Math.pow(1 - progress, 3);


                        counter.textContent =
                            Math.floor(target * ease);


                        if (progress < 1) {

                            requestAnimationFrame(updateCounter);

                        } else {

                            counter.textContent = target;

                        }

                    }


                    requestAnimationFrame(updateCounter);


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    }



    /* =====================================================
       VIDEO HOVER PLAY
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        const video =
            card.querySelector("video");


        if (!video) return;


        video.muted = true;

        video.playsInline = true;


        card.addEventListener("mouseenter", () => {

            video.currentTime = 0;

            const playPromise =
                video.play();


            if (playPromise !== undefined) {

                playPromise.catch(() => {});

            }

        });


        card.addEventListener("mouseleave", () => {

            video.pause();

            video.currentTime = 0;

        });

    });



    /* =====================================================
       MOBILE VIDEO AUTOPLAY
    ===================================================== */

    const videoObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    const video =
                        entry.target;


                    if (entry.isIntersecting) {

                        video.muted = true;

                        video.play().catch(() => {});

                    } else {

                        video.pause();

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    document
        .querySelectorAll(".portfolio-video")
        .forEach((video) => {

            videoObserver.observe(video);

        });



    /* =====================================================
       VIDEO MODAL
    ===================================================== */

    const modal =
        document.getElementById("videoModal");


    const modalVideo =
        document.getElementById("modalVideo");


    const modalClose =
        document.getElementById("modalClose");


    const modalBackground =
        document.querySelector(".modal-background");


    if (
        modal &&
        modalVideo &&
        modalClose
    ) {


        document
            .querySelectorAll(".play-project")
            .forEach((button) => {


                button.addEventListener("click", (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    const card =
                        button.closest(".project-card");


                    if (!card) return;


                    const video =
                        card.querySelector("video");


                    if (!video) return;


                    const source =
                        video.querySelector("source");


                    if (!source) return;


                    modalVideo.src =
                        source.src;


                    modal.classList.add("active");


                    document.body.style.overflow =
                        "hidden";


                    modalVideo.currentTime = 0;


                    modalVideo.play().catch(() => {});

                });

            });



        function closeModal() {

            modal.classList.remove("active");

            modalVideo.pause();

            modalVideo.removeAttribute("src");

            modalVideo.load();

            document.body.style.overflow =
                "";

        }


        modalClose.addEventListener(
            "click",
            closeModal
        );


        if (modalBackground) {

            modalBackground.addEventListener(
                "click",
                closeModal
            );

        }


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("active")
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");


    const follower =
        document.querySelector(".cursor-follower");


    if (cursor && follower) {


        let mouseX = 0;

        let mouseY = 0;

        let followerX = 0;

        let followerY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        function animateFollower() {

            followerX +=
                (mouseX - followerX) * 0.12;


            followerY +=
                (mouseY - followerY) * 0.12;


            follower.style.left =
                `${followerX}px`;


            follower.style.top =
                `${followerY}px`;


            requestAnimationFrame(
                animateFollower
            );

        }


        animateFollower();



        /* Cursor hover */

        const interactiveElements =
            document.querySelectorAll(
                "a, button, .service-card, .project-card"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        follower.style.width =
                            "55px";

                        follower.style.height =
                            "55px";

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        follower.style.width =
                            "35px";

                        follower.style.height =
                            "35px";

                    }
                );

            }
        );

    }



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual) {


        document.addEventListener(
            "mousemove",
            (event) => {


                if (
                    window.innerWidth <= 900
                ) return;


                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 15;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 15;


                heroVisual.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }



    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function updateNavbar() {

        if (!navbar) return;


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

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();



    /* =====================================================
       SMOOTH ANCHORS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {


            anchor.addEventListener(
                "click",
                function(event) {


                    const href =
                        this.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) return;


                    const target =
                        document.querySelector(href);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }



    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


});
