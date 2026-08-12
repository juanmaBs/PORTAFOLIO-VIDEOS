document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       REVEAL
       ========================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.06,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    setTimeout(() => {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }, 2200);



    /* =========================================================
       CONTADORES
       ========================================================= */

    const counters = document.querySelectorAll(".counter");

    const animateCounter = counter => {

        const target =
            Number(counter.dataset.target) || 0;

        const duration = 1400;

        const start = performance.now();

        const tick = now => {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            counter.textContent =
                Math.floor(target * eased);

            if (progress < 1) {

                requestAnimationFrame(tick);

            } else {

                counter.textContent = target;

            }

        };

        requestAnimationFrame(tick);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.target || "0";

        });

    }



    /* =========================================================
       VIDEOS DEL PORTAFOLIO
       
       IMPORTANTE:
       - NO MODIFICAMOS EL SCROLL
       - NO USAMOS MODAL
       - NO USAMOS OVERFLOW HIDDEN
       - SOLO EL BOTÓN CONTROLA EL VIDEO
       ========================================================= */

    const projectCards =
        document.querySelectorAll(".project-card");

    const videos =
        document.querySelectorAll(".portfolio-video");


    videos.forEach(video => {

        video.muted = true;
        video.playsInline = true;

        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");

        video.preload = "metadata";

        /*
         * Evitamos que el video interfiera
         * con el scroll de la página.
         */
        video.style.touchAction = "pan-y";

    });



    /* =========================================================
       FUNCIÓN PARA PAUSAR TODOS LOS VIDEOS
       ========================================================= */

    const pauseAllVideos = exceptVideo => {

        videos.forEach(video => {

            if (video === exceptVideo) {
                return;
            }

            video.pause();
            video.currentTime = 0;

            const card =
                video.closest(".project-card");

            if (card) {
                card.classList.remove("is-playing");
            }

        });

    };



    /* =========================================================
       BOTONES PLAY
       ========================================================= */

    projectCards.forEach(card => {

        const video =
            card.querySelector(".portfolio-video");

        const playButton =
            card.querySelector(".play-project");


        if (!video || !playButton) {
            return;
        }


        playButton.addEventListener("click", event => {

            /*
             * IMPORTANTE:
             * El botón no debe provocar ninguna navegación.
             */
            event.preventDefault();
            event.stopPropagation();


            /*
             * Si este video ya está reproduciéndose,
             * lo pausamos.
             */
            if (!video.paused) {

                video.pause();

                card.classList.remove("is-playing");

                return;

            }


            /*
             * Primero pausamos cualquier otro video.
             */
            pauseAllVideos(video);


            /*
             * Aseguramos que el scroll de la página
             * permanezca completamente habilitado.
             */
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";


            /*
             * Comenzamos desde el principio.
             */
            video.currentTime = 0;


            /*
             * Reproducimos el video.
             */
            const playPromise = video.play();


            if (playPromise !== undefined) {

                playPromise
                    .then(() => {

                        card.classList.add("is-playing");

                    })
                    .catch(error => {

                        console.log(
                            "No se pudo reproducir el video:",
                            error
                        );

                    });

            }

        });



        /* =====================================================
           CUANDO TERMINA EL VIDEO
           ===================================================== */

        video.addEventListener("ended", () => {

            card.classList.remove("is-playing");

            video.pause();

            video.currentTime = 0;

        });



        /* =====================================================
           SI EL VIDEO SE PAUSA
           ===================================================== */

        video.addEventListener("pause", () => {

            card.classList.remove("is-playing");

        });



        /* =====================================================
           SI EL VIDEO EMPIEZA
           ===================================================== */

        video.addEventListener("play", () => {

            card.classList.add("is-playing");

            /*
             * Garantizamos nuevamente que
             * el scroll nunca se bloquee.
             */
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";

        });

    });



    /* =========================================================
       MUY IMPORTANTE:
       NO AUTOPLAY AL PASAR EL MOUSE
       
       Antes teníamos mouseenter sobre las tarjetas.
       Lo eliminamos porque podía generar conflictos
       con el botón Play.
       ========================================================= */



    /* =========================================================
       CURSOR PERSONALIZADO
       ========================================================= */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");


    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        const animateFollower = () => {

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

        };


        animateFollower();


        document
            .querySelectorAll(
                "a, button, .service-card, .project-card"
            )
            .forEach(element => {

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

            });

    }



    /* =========================================================
       HERO PARALLAX
       ========================================================= */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 900) {
                    return;
                }


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



    /* =========================================================
       NAVBAR
       ========================================================= */

    const navbar =
        document.querySelector(".navbar");


    const updateNavbar = () => {

        if (!navbar) {
            return;
        }


        const scrolled =
            window.scrollY > 40;


        navbar.style.background =
            scrolled
                ? "rgba(7,7,7,.72)"
                : "transparent";


        navbar.style.backdropFilter =
            scrolled
                ? "blur(18px)"
                : "none";


        navbar.style.border =
            scrolled
                ? "1px solid rgba(255,255,255,.07)"
                : "none";


        navbar.style.borderRadius =
            scrolled
                ? "100px"
                : "0";


        navbar.style.padding =
            scrolled
                ? "0 20px"
                : "0 5px";

    };


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();



    /* =========================================================
       SCROLL SUAVE
       ========================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(href);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =========================================================
       REDUCED MOTION
       ========================================================= */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }



    /* =========================================================
       GARANTIZAR SCROLL DE LA PÁGINA
       ========================================================= */

    /*
     * Por seguridad eliminamos cualquier estado
     * de bloqueo que haya quedado de una versión
     * anterior del portafolio.
     */

    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";



    /* =========================================================
       PAGE LOADED
       ========================================================= */

    document.body.classList.add(
        "page-loaded"
    );

});
