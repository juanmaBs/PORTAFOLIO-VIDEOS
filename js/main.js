// ================================
// CARGAR PROYECTOS
// ================================

const track = document.getElementById("video-grid");

let currentIndex = 0;
let cards = [];
let cardWidth = 0;

fetch("./database/projects.json")
    .then(res => res.json())
    .then(data => {

        data.forEach(project => {

            const card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <video controls playsinline preload="metadata">
                    <source src="${project.url}" type="video/mp4">
                </video>

                <h3>${project.titulo}</h3>
            `;

            track.appendChild(card);

        });

        cards = document.querySelectorAll(".video-card");

        observeCards();

        updateCarousel();

    });


// ================================
// ANIMACIÓN DE ENTRADA
// ================================

function observeCards(){

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:0.2

    });

    cards.forEach(card=>observer.observe(card));

}


// ================================
// CARRUSEL
// ================================

function updateCarousel(){

    if(cards.length===0) return;

    cardWidth = cards[0].offsetWidth + 24;

    track.style.transform =
        `translateX(-${currentIndex*cardWidth}px)`;

}



// ================================
// BOTONES
// ================================

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click",()=>{

    if(currentIndex>0){

        currentIndex--;

        updateCarousel();

    }

});

nextBtn.addEventListener("click",()=>{

    if(currentIndex<cards.length-1){

        currentIndex++;

        updateCarousel();

    }

});



// ================================
// RESPONSIVE
// ================================

window.addEventListener("resize",()=>{

    updateCarousel();

});



// ================================
// TECLADO
// ================================

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});



// ================================
// DRAG CON MOUSE
// ================================

let isDown=false;

let startX;

let scrollLeft;

const container=document.querySelector(".carousel-track-container");

container.addEventListener("mousedown",(e)=>{

    isDown=true;

    startX=e.pageX;

    scrollLeft=container.scrollLeft;

});

container.addEventListener("mouseleave",()=>{

    isDown=false;

});

container.addEventListener("mouseup",()=>{

    isDown=false;

});

container.addEventListener("mousemove",(e)=>{

    if(!isDown) return;

    e.preventDefault();

    const walk=(e.pageX-startX)*1.5;

    container.scrollLeft=scrollLeft-walk;

});



// ================================
// SWIPE CELULAR
// ================================

let touchStart=0;

container.addEventListener("touchstart",(e)=>{

    touchStart=e.touches[0].clientX;

});

container.addEventListener("touchend",(e)=>{

    const touchEnd=e.changedTouches[0].clientX;

    const diff=touchStart-touchEnd;

    if(Math.abs(diff)<50) return;

    if(diff>0){

        nextBtn.click();

    }else{

        prevBtn.click();

    }

});
