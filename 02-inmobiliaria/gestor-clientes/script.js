document.addEventListener("DOMContentLoaded", function () {

    const boton = document.querySelector(".boton");
    const formulario = document.querySelector("form");
    const tabla = document.querySelector(".tabla tbody");

    if (!boton || !formulario || !tabla) {
        console.error("No se encontró el formulario, botón o tabla.");
        return;
    }

    // Cargar clientes guardados anteriormente
    const clientes = JSON.parse(
        localStorage.getItem("nexora_clientes") || "[]"
    );

    clientes.forEach(function (cliente) {
        añadirClienteATabla(cliente);
    });

    // Guardar nuevo cliente
    boton.addEventListener("click", function () {

        const campos = formulario.querySelectorAll("input, select");

        const cliente = {
            nombre: campos[0].value.trim(),
            telefono: campos[1].value.trim(),
            email: campos[2].value.trim(),
            tipo: campos[3].value,
            inmueble: campos[4].value.trim(),
            estado: campos[5].value
        };

        if (!cliente.nombre) {
            alert("Introduce el nombre del cliente.");
            return;
        }

        añadirClienteATabla(cliente);

        clientes.push(cliente);

        localStorage.setItem(
            "nexora_clientes",
            JSON.stringify(clientes)
        );

        formulario.reset();

        alert("Cliente guardado correctamente en NEXORA");
    });

    function añadirClienteATabla(cliente) {

        const fila = document.createElement("tr");

        const nombre = document.createElement("td");
        nombre.textContent = cliente.nombre;

        const tipo = document.createElement("td");
        tipo.textContent = cliente.tipo;

        const inmueble = document.createElement("td");
        inmueble.textContent = cliente.inmueble;

        const estado = document.createElement("td");
        estado.textContent = cliente.estado;
        estado.className = "estado";

        fila.appendChild(nombre);
        fila.appendChild(tipo);
        fila.appendChild(inmueble);
        fila.appendChild(estado);

        tabla.appendChild(fila);
    }

});
