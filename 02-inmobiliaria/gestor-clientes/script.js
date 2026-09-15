document.addEventListener("DOMContentLoaded", function () {

    const boton = document.querySelector(".boton");
    const formulario = document.querySelector("form");
    const tabla = document.querySelector(".tabla tbody");

    boton.addEventListener("click", function () {

        const campos = formulario.querySelectorAll("input, select");

        const nombre = campos[0].value.trim();
        const telefono = campos[1].value.trim();
        const email = campos[2].value.trim();
        const tipo = campos[3].value;
        const inmueble = campos[4].value.trim();
        const estado = campos[5].value;

        if (!nombre) {
            alert("Introduce el nombre del cliente.");
            return;
        }

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${tipo}</td>
            <td>${inmueble}</td>
            <td class="estado">${estado}</td>
        `;

        tabla.appendChild(fila);

        const clientes = JSON.parse(
            localStorage.getItem("nexora_clientes") || "[]"
        );

        clientes.push({
            nombre: nombre,
            telefono: telefono,
            email: email,
            tipo: tipo,
            inmueble: inmueble,
            estado: estado
        });

        localStorage.setItem(
            "nexora_clientes",
            JSON.stringify(clientes)
        );

        formulario.reset();

        alert("Cliente guardado correctamente en NEXORA");
    });

});
