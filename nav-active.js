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
