document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("form");
    const boton = document.querySelector(".boton");

    if (!formulario || !boton) {
        console.error("No se encontró el formulario o el botón.");
        return;
    }

    const inmuebles = JSON.parse(
        localStorage.getItem("nexora_inmuebles") || "[]"
    );

    boton.addEventListener("click", function () {

        const campos = formulario.querySelectorAll("input, select");

        const inmueble = {
            referencia: campos[0].value.trim(),
            tipo: campos[1].value,
            operacion: campos[2].value,
            zona: campos[3].value.trim(),
            precio: campos[4].value.trim(),
            superficie: campos[5].value.trim(),
            habitaciones: campos[6].value.trim(),
            banos: campos[7].value.trim()
        };

        if (!inmueble.referencia) {
            alert("Introduce la referencia del inmueble.");
            return;
        }

        inmuebles.push(inmueble);

        localStorage.setItem(
            "nexora_inmuebles",
            JSON.stringify(inmuebles)
        );

        formulario.reset();

        alert("Inmueble guardado correctamente en NEXORA");
    });

});
