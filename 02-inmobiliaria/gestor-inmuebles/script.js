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
        mostrarInmuebles();
    });
function mostrarInmuebles() {

    const lista = document.querySelector("#listaInmuebles");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (inmuebles.length === 0) {
        lista.innerHTML = "<p>No hay inmuebles registrados todavía.</p>";
        return;
    }

    inmuebles.forEach(function (inmueble) {

        const tarjeta = document.createElement("div");

        tarjeta.style.border = "1px solid #e5e7eb";
        tarjeta.style.borderRadius = "10px";
        tarjeta.style.padding = "15px";
        tarjeta.style.marginBottom = "12px";

        tarjeta.innerHTML = `
            <strong>${inmueble.referencia}</strong><br>
            🏠 ${inmueble.tipo}<br>
            🔑 ${inmueble.operacion}<br>
            📍 ${inmueble.zona}<br>
            💶 ${inmueble.precio} €<br>
            📐 ${inmueble.superficie} m²<br>
            🛏️ ${inmueble.habitaciones} habitaciones ·
            🚿 ${inmueble.banos} baños
        `;

        lista.appendChild(tarjeta);

    });
}

mostrarInmuebles();
});
