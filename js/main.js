/* =========================================================
   JUAN MANUEL BELLO — PORTFOLIO JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

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


    /* Seguridad para evitar elementos invisibles */

    setTimeout(() => {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }, 2200);



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const animateCounter = (counter) => {

        const target =
            Number(counter.dataset.target) || 0;

        const duration = 1400;

        const start =
            performance.now();


        const tick = (now) => {

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

                counter.textContent =
                    target;

            }

        };


        requestAnimationFrame(tick);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;


                        animateCounter(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

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



    /* =====================================================
       PORTFOLIO VIDEOS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    const videos =
        document.querySelectorAll(".portfolio-video");


    /*
       Los videos de las tarjetas son previews.

       IMPORTANTE:
       Estos videos permanecen muted porque
       los navegadores bloquean autoplay con sonido.
    */

    videos.forEach(video => {

        video.muted = true;

        video.playsInline = true;

        video.setAttribute(
            "muted",
            ""
        );

        video.setAttribute(
            "playsinline",
            ""
        );

    });



    /* =====================================================
       DESKTOP — HOVER PREVIEW
    ===================================================== */

    projectCards.forEach(card => {

        const video =
            card.querySelector(".portfolio-video");


        if (!video) return;


        card.addEventListener(
            "mouseenter",
            () => {

                /*
                   Solo preview.
                   Sin sonido.
                */

                video.muted = true;

                video.currentTime = 0;

                const playPromise =
                    video.play();


                if (
                    playPromise !== undefined
                ) {

                    playPromise.catch(() => {});

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                video.pause();

                video.currentTime = 0;

            }
        );

    });



    /* =====================================================
       MOBILE — AUTOPLAY PREVIEW
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const videoObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        const video =
                            entry.target;


                        if (
                            entry.isIntersecting &&
                            window.innerWidth <= 900
                        ) {

                            /*
                               Preview móvil sin sonido.
                            */

                            video.muted = true;

                            video.play()
                                .catch(() => {});

                        } else {

                            video.pause();

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );


        videos.forEach(video => {

            videoObserver.observe(video);

        });

    }



    /* =====================================================
   VIDEO MODAL
===================================================== */

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalClose = document.getElementById("modalClose");
const modalBackground = document.querySelector(".modal-background");

let activeProjectCard = null;
let activePlayButton = null;


/* =====================================================
   OCULTAR BOTÓN PLAY
===================================================== */

function hideProjectPlay(card, button) {

    if (button) {

        button.style.opacity = "0";
        button.style.visibility = "hidden";
        button.style.pointerEvents = "none";

    }

    if (card) {

        card.classList.add("video-playing");

    }

}


/* =====================================================
   MOSTRAR BOTÓN PLAY
===================================================== */

function showProjectPlay() {

    if (activePlayButton) {

        activePlayButton.style.opacity = "";
        activePlayButton.style.visibility = "";
        activePlayButton.style.pointerEvents = "";

    }

    if (activeProjectCard) {

        activeProjectCard.classList.remove(
            "video-playing"
        );

    }

    activePlayButton = null;
    activeProjectCard = null;

}


/* =====================================================
   CERRAR MODAL
===================================================== */

function closeModal() {

    if (!modal || !modalVideo) return;


    /* Detener completamente el video */

    modalVideo.pause();

    modalVideo.currentTime = 0;


    /* Quitar fuente */

    modalVideo.removeAttribute("src");

    modalVideo.load();


    /* Quitar modal */

    modal.classList.remove("active");


    /*
       MUY IMPORTANTE:

       NO usamos overflow:hidden.
       La página conserva su scrollbar.
    */

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";


    /* Restaurar botón */

    showProjectPlay();

}


/* =====================================================
   ABRIR VIDEO
===================================================== */

if (modal && modalVideo) {

    document
        .querySelectorAll(".play-project")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    const card =
                        button.closest(".project-card");


                    if (!card) return;


                    const video =
                        card.querySelector(
                            ".portfolio-video"
                        );


                    if (!video) return;


                    const source =
                        video.querySelector("source");


                    if (!source) return;


                    let videoSrc =
                        source.getAttribute("src");


                    if (!videoSrc) return;


                    try {

                        videoSrc =
                            new URL(
                                videoSrc,
                                window.location.href
                            ).href;

                    } catch (error) {

                        console.error(
                            "Error cargando video:",
                            error
                        );

                        return;

                    }


                    /*
                       Guardamos cuál proyecto
                       estamos reproduciendo.
                    */

                    activeProjectCard = card;
                    activePlayButton = button;


                    /*
                       OCULTAMOS DIRECTAMENTE
                       EL BOTÓN PLAY.
                    */

                    hideProjectPlay(
                        card,
                        button
                    );


                    /*
                       Detenemos el preview
                       de la tarjeta.
                    */

                    video.pause();


                    /*
                       Limpiamos el video anterior.
                    */

                    modalVideo.pause();

                    modalVideo.removeAttribute("src");

                    modalVideo.load();


                    /*
                       Cargamos el nuevo video.
                    */

                    modalVideo.src = videoSrc;


                    /*
                       AUDIO ACTIVADO.
                    */

                    modalVideo.muted = false;
                    modalVideo.volume = 1;

                    modalVideo.playsInline = true;

                    modalVideo.setAttribute(
                        "playsinline",
                        ""
                    );

                    modalVideo.removeAttribute(
                        "muted"
                    );


                    /*
                       Mostramos modal.
                    */

                    modal.classList.add("active");


                    /*
                       NO bloqueamos el scroll.
                    */

                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";


                    /*
                       Empezar desde 0.
                    */

                    modalVideo.currentTime = 0;


                    /*
                       Reproducir.
                    */

                    const playPromise =
                        modalVideo.play();


                    if (playPromise !== undefined) {

                        playPromise.catch(error => {

                            console.log(
                                "El navegador necesita interacción para reproducir con sonido.",
                                error
                            );

                        });

                    }

                }
            );

        });



    /* =================================================
       BOTÓN CERRAR
    ================================================= */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeModal();

            }
        );

    }



    /* =================================================
       FONDO DEL MODAL
    ================================================= */

    if (modalBackground) {

        modalBackground.addEventListener(
            "click",
            event => {

                /*
                   Solo cerrar si se hizo clic
                   directamente en el fondo.
                */

                if (
                    event.target === modalBackground
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =================================================
       ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeModal();

            }

        }
    );



    /* =================================================
       SI EL USUARIO HACE SCROLL
       CERRAMOS EL VIDEO
    ================================================= */

    let scrollTimeout = null;


    window.addEventListener(
        "scroll",
        () => {

            if (
                !modal.classList.contains("active")
            ) return;


            /*
               Cerramos el modal al comenzar
               a desplazarse por el portafolio.
            */

            if (!scrollTimeout) {

                scrollTimeout =
                    setTimeout(() => {

                        closeModal();

                        scrollTimeout = null;

                    }, 20);

            }

        },
        {
            passive: true
        }
    );



    /* =================================================
       RUEDA DEL MOUSE
       PERMITE SEGUIR BAJANDO
    ================================================= */

    window.addEventListener(
        "wheel",
        event => {

            if (
                !modal.classList.contains("active")
            ) return;


            /*
               Cerramos el video inmediatamente
               al intentar desplazarse.
            */

            closeModal();

        },
        {
            passive: true,
            capture: true
        }
    );



    /* =================================================
       TOUCH / MÓVIL
    ================================================= */

    let touchStartY = 0;


    window.addEventListener(
        "touchstart",
        event => {

            if (
                !modal.classList.contains("active")
            ) return;


            touchStartY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        event => {

            if (
                !modal.classList.contains("active")
            ) return;


            const currentY =
                event.touches[0].clientY;


            const difference =
                Math.abs(
                    currentY - touchStartY
                );


            if (difference > 10) {

                closeModal();

            }

        },
        {
            passive: true
        }
    );



    /* =================================================
       CUANDO TERMINA EL VIDEO
    ================================================= */

    modalVideo.addEventListener(
        "ended",
        () => {

            /*
               El modal permanece abierto,
               pero el video queda detenido.
            */

            modalVideo.pause();

        }
    );

}

    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(
            ".cursor"
        );


    const follower =
        document.querySelector(
            ".cursor-follower"
        );


    if (
        cursor &&
        follower &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;

        let mouseY = 0;

        let followerX = 0;

        let followerY = 0;


        document.addEventListener(
            "mousemove",
            event => {

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


        const animateFollower = () => {

            followerX +=
                (mouseX - followerX) *
                0.12;


            followerY +=
                (mouseY - followerY) *
                0.12;


            follower.style.left =
                `${followerX}px`;


            follower.style.top =
                `${followerY}px`;


            requestAnimationFrame(
                animateFollower
            );

        };


        animateFollower();



        /* Cursor hover */

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



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

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
        document.querySelector(
            ".navbar"
        );


    const updateNavbar = () => {

        if (!navbar) return;


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



    /* =====================================================
       SMOOTH ANCHORS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            href
                        );


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

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }



    /* =====================================================
       CONTACTO — WHATSAPP / CORREO
    ===================================================== */
    const contactTrigger = document.getElementById("contactTrigger");
    const contactMenu = document.getElementById("contactMenu");

    if (contactTrigger && contactMenu) {
        const closeContactMenu = () => {
            contactMenu.classList.remove("active");
            contactMenu.setAttribute("aria-hidden", "true");
            contactTrigger.setAttribute("aria-expanded", "false");
        };

        contactTrigger.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = contactMenu.classList.toggle("active");
            contactMenu.setAttribute("aria-hidden", String(!isOpen));
            contactTrigger.setAttribute("aria-expanded", String(isOpen));
        });

        contactMenu.addEventListener("click", event => {
            event.stopPropagation();
        });

        document.addEventListener("click", event => {
            if (!contactMenu.contains(event.target) && !contactTrigger.contains(event.target)) {
                closeContactMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeContactMenu();
        });
    }

    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
