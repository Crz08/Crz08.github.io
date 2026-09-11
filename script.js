document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const servicio = document.getElementById('servicioSelect').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            const telefono = '573169709152';

            const texto = `Hola, soy ${nombre}.

Correo: ${email}
Servicio de interés: ${servicio}

Mensaje:
${mensaje}`;

            const whatsappURL = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

            window.open(whatsappURL, '_blank');

            formAlert.classList.remove('d-none');
            formAlert.classList.remove('alert-danger');
            formAlert.classList.add('alert-success');
            formAlert.textContent = `¡Gracias ${nombre}! Se abrió WhatsApp con tu solicitud.`;

            contactForm.reset();

            setTimeout(() => {
                formAlert.classList.add('d-none');
            }, 6000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
