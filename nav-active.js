// Botón hamburguesa: muestra/oculta el menú de navegación en tablets y celulares
document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');
    var navList = navMenu ? navMenu.querySelector('ul') : null;

    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        navList.classList.toggle('active');
    });

    // Cierra el menú al elegir una opción
    navList.querySelectorAll('a').forEach(function (enlace) {
        enlace.addEventListener('click', function () {
            navList.classList.remove('active');
        });
    });

    // Cierra el menú si se hace click fuera de él
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target)) {
            navList.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var enlaces = document.querySelectorAll('.header-nav ul li a:not(.btn-contacto)');
    var rutaActual = window.location.pathname.split('/').pop() || 'index.html';
    var esPaginaDeProducto = window.location.pathname.includes('/Productos/');

    enlaces.forEach(function (enlace) {
        var rutaEnlace = enlace.pathname.split('/').pop() || 'index.html';

        if (rutaEnlace === rutaActual || (esPaginaDeProducto && rutaEnlace === 'productos.html')) {
            enlace.classList.add('active');
        }
    });
});

// Botón de Whatsapp: al hacer click muestra/oculta los botones de ventas (México y Estados Unidos)
document.addEventListener('DOMContentLoaded', function () {
    var contactMenu = document.querySelector('.contact-menu');
    var botonWhatsapp = document.querySelector('.menu-item.whatsapp-toggle');

    if (!contactMenu || !botonWhatsapp) return;

    botonWhatsapp.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        contactMenu.classList.toggle('mostrar-ventas');
    });

    // Cierra los botones de ventas si se hace click fuera del menú
    document.addEventListener('click', function (e) {
        if (!contactMenu.contains(e.target)) {
            contactMenu.classList.remove('mostrar-ventas');
        }
    });
});
