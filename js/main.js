document.addEventListener('DOMContentLoaded', () => {
    fetch('./database/projects.json')
        .then(res => res.json())
        .then(data => {
            const grid = document.getElementById('video-grid');
            grid.innerHTML = ''; 

            data.forEach(p => {
                grid.innerHTML += `
                    <div class="video-card">
                        <video controls playsinline preload="none"
                               style="width: 100%; aspect-ratio: 9/16; object-fit: cover;">
                            <source src="${p.url}" type="video/mp4">
                            Tu navegador no soporta videos.
                        </video>
                        <h3>${p.titulo}</h3>
                    </div>
                 `;
            });

            // Observador para la animación de entrada
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            });
            document.querySelectorAll('.video-card').forEach(card => observer.observe(card));

            // --- INICIAR EL MOVIMIENTO AUTOMÁTICO ---
            initAutoScroll();
        })
        .catch(err => console.log("Error al cargar JSON:", err));
});

let currentOffset = 0;
let autoScrollInterval;

function moveSlide(direction) {
    const grid = document.getElementById('video-grid');
    const cards = grid.querySelectorAll('.video-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; 
    const wrapperWidth = grid.parentElement.offsetWidth;
    
    currentOffset -= (direction * cardWidth); // Se mueve de a 1 tarjeta para que sea suave
    
    const totalWidth = cards.length * cardWidth;
    const maxOffset = -(totalWidth - wrapperWidth);

    // Si llega al final, vuelve al inicio en bucle infinito
    if (currentOffset > 0) {
        currentOffset = maxOffset;
    } else if (currentOffset < maxOffset && maxOffset < 0) {
        currentOffset = 0;
    }

    grid.style.transform = `translateX(${currentOffset}px)`;
}

// Función para el movimiento automático
function initAutoScroll() {
    const wrapper = document.getElementById('video-grid-wrapper');
    if (!wrapper) return;

    // Se mueve automáticamente hacia adelante cada 3.5 segundos
    autoScrollInterval = setInterval(() => {
        moveSlide(1);
    }, 3500);

    // Pausar cuando el cliente ponga el mouse encima del carrusel
    wrapper.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Reanudar cuando el cliente retire el mouse
    wrapper.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            moveSlide(1);
        }, 3500);
    });
}
