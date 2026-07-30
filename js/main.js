document.addEventListener('DOMContentLoaded', () => {
    fetch('./database/projects.json')
        .then(res => res.json())
        .then(data => {
            const grid = document.getElementById('video-grid');
            grid.innerHTML = ''; 

            data.forEach(p => {
                grid.innerHTML += `
                    <div class="video-card">
                        <video controls playsinline
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
        })
        .catch(err => console.log("Error al cargar JSON:", err));
});

let currentOffset = 0;

function moveSlide(direction) {
    const grid = document.getElementById('video-grid');
    const cards = grid.querySelectorAll('.video-card');
    if (cards.length === 0) return;

    // Mide el ancho real de la tarjeta más el margen (gap de 20px)
    const cardWidth = cards[0].offsetWidth + 20; 
    const wrapperWidth = grid.parentElement.offsetWidth;
    
    // Mueve de a 2 tarjetas por cada clic para mayor fluidez
    currentOffset -= (direction * (cardWidth * 2));
    
    // Calcula el ancho total real de todas las tarjetas generadas
    const totalWidth = cards.length * cardWidth;
    const maxOffset = -(totalWidth - wrapperWidth);

    // Límites para evitar que se pase del inicio o del final
    if (currentOffset > 0) currentOffset = 0;
    if (currentOffset < maxOffset && maxOffset < 0) currentOffset = maxOffset;

    grid.style.transform = `translateX(${currentOffset}px)`;
}
