// Actualiza automáticamente el año en el aviso de derechos reservados del footer
document.addEventListener('DOMContentLoaded', function () {
    var elAnio = document.getElementById('year');
    if (elAnio) {
        elAnio.textContent = new Date().getFullYear();
    }
});



// Script para reproducir/pausar video con botón play
document.addEventListener('DOMContentLoaded', function() {
    // Botones de reproducción de video (funciona para "Nuestra historia"
    // y para "Por qué elegirnos", y para cualquier otro bloque similar que se agregue)
    const bloquesVideo = document.querySelectorAll('.historia-video, .video-elegirnos-container');

    bloquesVideo.forEach(function (bloque) {
        const playButton = bloque.querySelector('.play-button');
        const video = bloque.querySelector('video');

        if (!playButton || !video) return;

        let videoEnded = false; // Variable para rastrear si el video terminó

        // Al hacer clic en el botón play
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (videoEnded) {
                // Si el video terminó, reiniciar desde el inicio
                video.currentTime = 0;
                videoEnded = false;
            }
            video.play();
            // Ocultar botón cuando comienza a reproducir
            playButton.style.display = 'none';
        });

        // Al hacer clic en el video
        video.addEventListener('click', function() {
            if (!video.paused && !videoEnded) {
                // Si está reproduciéndose y no ha terminado, pausar
                video.pause();
                // Mostrar botón cuando se pausa
                playButton.style.display = 'flex';
            } else if (video.paused && !videoEnded) {
                // Si está pausado y no ha terminado, reanudar
                video.play();
                playButton.style.display = 'none';
            } else if (videoEnded) {
                // Si el video terminó, reiniciar desde el inicio
                video.currentTime = 0;
                videoEnded = false;
                video.play();
                playButton.style.display = 'none';
            }
        });

        // Cuando el video termina, mostrar el botón play y marcar como terminado
        video.addEventListener('ended', function() {
            videoEnded = true;
            playButton.style.display = 'flex';
        });
    });

    // Script para rotar imágenes en hover (crossfade: la capa base siempre
    // queda opaca cubriendo el fondo, así nunca se ve el color del contenedor)
    const imagenesRotativas = document.querySelectorAll('.card-producto__imagen');

    imagenesRotativas.forEach(contenedor => {
        const imgBase = contenedor.querySelector('.imagen-rotativa--base');
        const imgTop = contenedor.querySelector('.imagen-rotativa--top');
        const images = JSON.parse(contenedor.getAttribute('data-images'));
        let indiceActual = 0;
        let rotationInterval;

        // Precarga las imágenes para que el cambio de src sea instantáneo
        images.forEach(src => { const pre = new Image(); pre.src = src; });

        // Cuando el mouse entra en la imagen
        contenedor.addEventListener('mouseenter', function() {
            rotationInterval = setInterval(function() {
                const siguienteIndice = (indiceActual + 1) % images.length;

                // La capa de arriba carga la siguiente imagen, invisible aún
                imgTop.src = images[siguienteIndice];

                // Forzar reflow para que la transición se aplique correctamente
                void imgTop.offsetHeight;

                // Aparece con un leve desplazamiento; la base sigue opaca debajo
                imgTop.style.opacity = '1';
                imgTop.style.transform = 'translateX(0)';

                setTimeout(function() {
                    // La capa base adopta la imagen ya visible
                    imgBase.src = images[siguienteIndice];
                    // La capa de arriba se resetea sin transición, lista para el próximo cambio
                    imgTop.style.transition = 'none';
                    imgTop.style.opacity = '0';
                    imgTop.style.transform = 'translateX(-20px)';
                    void imgTop.offsetHeight;
                    imgTop.style.transition = '';

                    indiceActual = siguienteIndice;
                }, 600); // Debe coincidir con la duración de la transición en CSS
            }, 1600); // Tiempo que se ve cada imagen antes de cambiar
        });

        // Cuando el mouse sale de la imagen
        contenedor.addEventListener('mouseleave', function() {
            clearInterval(rotationInterval);
            imgTop.style.transition = 'none';
            imgTop.style.opacity = '0';
            imgTop.style.transform = 'translateX(-20px)';
            void imgTop.offsetHeight;
            imgTop.style.transition = '';
            indiceActual = 0;
            imgBase.src = images[0];
            imgTop.src = images[0];
        });
    });
});
