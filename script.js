document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("formAlert");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const servicio = document.getElementById("servicioSelect").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !servicio || !mensaje) {
            mostrarAlerta(
                "Por favor completa todos los campos.",
                "danger"
            );
            return;
        }

        const boton = form.querySelector("button[type='submit']");

        boton.disabled = true;
        boton.innerHTML = "Enviando...";

        const telefono = "573169709152";

        const textoWhatsApp =
`Nueva solicitud desde SecCode & Tech

Nombre: ${nombre}
Correo: ${email}
Servicio: ${servicio}

Mensaje:
${mensaje}`;

        const whatsappURL =
            `https://wa.me/${telefono}?text=${encodeURIComponent(textoWhatsApp)}`;

        const formData = new FormData(form);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {

                mostrarAlerta(
                    `Gracias ${nombre}. Tu solicitud fue enviada correctamente.`,
                    "success"
                );

                window.open(whatsappURL, "_blank");

                form.reset();

            } else {

                mostrarAlerta(
                    "No fue posible enviar el correo. Se abrirá WhatsApp para que puedas enviar la solicitud.",
                    "warning"
                );

                window.open(whatsappURL, "_blank");
            }

        } catch (error) {

            mostrarAlerta(
                "No fue posible conectar con el servicio de correo. Se abrirá WhatsApp.",
                "warning"
            );

            window.open(whatsappURL, "_blank");

        } finally {

            boton.disabled = false;

            boton.innerHTML =
                `Enviar solicitud
                <i class="fa-solid fa-arrow-right ms-2"></i>`;
        }
    });


    function mostrarAlerta(mensaje, tipo) {

        alertBox.className = `alert alert-${tipo}`;
        alertBox.textContent = mensaje;

        alertBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        setTimeout(() => {
            alertBox.className = "alert d-none";
        }, 7000);
    }


    document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

        enlace.addEventListener("click", function (event) {

            const destino = this.getAttribute("href");

            if (destino === "#") {
                return;
            }

            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});
