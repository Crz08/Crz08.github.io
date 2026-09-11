document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("formAlert");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const servicio = document.getElementById("servicioSelect").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !servicio || !mensaje) {
            mostrarMensaje(
                "Por favor completa todos los campos.",
                "danger"
            );
            return;
        }

        const boton = form.querySelector("button[type='submit']");

        boton.disabled = true;
        boton.innerHTML = `
            Enviando...
            <i class="fa-solid fa-spinner fa-spin ms-2"></i>
        `;

        const numeroWhatsApp = "573133972761";

        const mensajeWhatsApp = `
Nueva solicitud desde SecCode & Tech

Nombre: ${nombre}
Correo: ${email}
Servicio: ${servicio}

Mensaje:
${mensaje}
        `.trim();

        const urlWhatsApp =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensajeWhatsApp);

        try {

            const datos = new FormData(form);

            const respuesta = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: datos
                }
            );

            const resultado = await respuesta.json();

            if (resultado.success) {

                mostrarMensaje(
                    "Solicitud enviada correctamente. También se abrirá WhatsApp.",
                    "success"
                );

                form.reset();

                window.open(urlWhatsApp, "_blank");

            } else {

                mostrarMensaje(
                    "No se pudo enviar el correo. Se abrirá WhatsApp.",
                    "warning"
                );

                window.open(urlWhatsApp, "_blank");
            }

        } catch (error) {

            console.error(error);

            mostrarMensaje(
                "No se pudo conectar con el servicio de correo. Se abrirá WhatsApp.",
                "warning"
            );

            window.open(urlWhatsApp, "_blank");

        } finally {

            boton.disabled = false;

            boton.innerHTML = `
                Enviar solicitud
                <i class="fa-solid fa-arrow-right ms-2"></i>
            `;
        }

    });


    function mostrarMensaje(mensaje, tipo) {

        alertBox.className = "alert alert-" + tipo;
        alertBox.textContent = mensaje;

        alertBox.classList.remove("d-none");

        alertBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        setTimeout(function () {

            alertBox.classList.add("d-none");

        }, 7000);
    }


    document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {

        enlace.addEventListener("click", function (event) {

            const destino = this.getAttribute("href");

            if (!destino || destino === "#") {
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
