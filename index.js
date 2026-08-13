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

    // Script para rotar imágenes: en hover (desktop, dispositivos con mouse)
    // o automáticamente al entrar en pantalla (tablets/celulares, donde no
    // existe un "hover" real y por lo tanto mouseenter/mouseleave nunca
    // se disparan).
    const imagenesRotativas = document.querySelectorAll('.card-producto__imagen');

    // Detecta si el dispositivo tiene un puntero fino con hover real
    // (mouse/trackpad). En tablets y celulares (touch) esto da "false".
    const tieneHoverReal = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    imagenesRotativas.forEach(contenedor => {
        const imgBase = contenedor.querySelector('.imagen-rotativa--base');
        const imgTop = contenedor.querySelector('.imagen-rotativa--top');
        const images = JSON.parse(contenedor.getAttribute('data-images'));
        let indiceActual = 0;
        let rotationInterval;

        // Precarga las imágenes para que el cambio de src sea instantáneo
        images.forEach(src => { const pre = new Image(); pre.src = src; });

        function avanzarImagen() {
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
        }

        function iniciarRotacion() {
            if (rotationInterval) return; // ya está corriendo
            rotationInterval = setInterval(avanzarImagen, 1600);
        }

        function detenerRotacion(reiniciar) {
            clearInterval(rotationInterval);
            rotationInterval = null;
            if (reiniciar) {
                imgTop.style.transition = 'none';
                imgTop.style.opacity = '0';
                imgTop.style.transform = 'translateX(-20px)';
                void imgTop.offsetHeight;
                imgTop.style.transition = '';
                indiceActual = 0;
                imgBase.src = images[0];
                imgTop.src = images[0];
            }
        }

        if (tieneHoverReal) {
            // Desktop / dispositivos con mouse: igual que antes, rota solo
            // mientras el cursor está encima y se reinicia al salir.
            contenedor.addEventListener('mouseenter', iniciarRotacion);
            contenedor.addEventListener('mouseleave', function() {
                detenerRotacion(true);
            });
        } else {
            // Tablets/celulares (sin hover real): la rotación arranca sola
            // apenas la tarjeta es visible en pantalla, y se pausa (sin
            // reiniciar la imagen) cuando sale de vista, para no gastar
            // recursos de más mientras el usuario navega el resto de la página.
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        iniciarRotacion();
                    } else {
                        detenerRotacion(false);
                    }
                });
            }, { threshold: 0.35 });

            observer.observe(contenedor);
        }
    });
});
