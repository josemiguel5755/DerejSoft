// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // Menú móvil: Toggle para abrir/cerrar el menú
    // =============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en cualquier enlace del menú
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===================================================
    // Animaciones al hacer scroll (Intersection Observer)
    // ===================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Aplica el observer a todos los elementos con la clase 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // =============================================
    // Formulario de contacto con SweetAlert2 (sin redirección)
    // =============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío tradicional del formulario

            // Muestra la alerta de SweetAlert2
            Swal.fire({
                title: '¡Mensaje enviado!',
                text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            // Envía el formulario al iframe oculto después de 2 segundos
            setTimeout(() => {
                // Crea un iframe oculto dinámicamente
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Configura el formulario para enviarse al iframe
                contactForm.target = 'hidden-iframe';
                contactForm.submit();

                // Limpia el formulario después de enviarlo
                contactForm.reset();

                // Elimina el iframe después de un tiempo (opcional)
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 5000);
            }, 2000);
        });
    }
});
