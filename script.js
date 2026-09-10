// Funcionalidad de interactividad para el sitio web
document.addEventListener('DOMContentLoaded', () => {
    
    // Manejo del formulario de contacto con dinamismo
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Obtener valores (puedes usarlos para integrarlos con APIs en el futuro)
            const nombre = document.getElementById('nombre').value;
            
            // Simular envío exitoso con animación y feedback visual
            formAlert.classList.remove('d-none');
            formAlert.textContent = `¡Gracias ${nombre}! Tu solicitud ha sido procesada correctamente. Te responderemos pronto.`;
            
            // Limpiar formulario
            contactForm.reset();

            // Ocultar la alerta después de 6 segundos
            setTimeout(() => {
                formAlert.classList.add('d-none');
            }, 6000);
        });
    }

    // Efecto de desplazamiento suave para los enlaces del menú (Smooth Scroll)
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

});
