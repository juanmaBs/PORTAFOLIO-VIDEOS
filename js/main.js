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

            // --- MUEVE EL OBSERVADOR AQUÍ ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            });
            document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
        })
        .catch(err => console.log("Error al cargar JSON:", err));
});
