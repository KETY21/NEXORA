document.addEventListener("DOMContentLoaded", function () {

    const boton = document.querySelector(".boton");
    const formulario = document.querySelector("form");
    const tabla = document.querySelector(".tabla tbody");
    const contadores = document.querySelectorAll(".dashboard .number");
const buscador = document.querySelector("#buscarCliente");
    if (!boton || !formulario || !tabla) {
        console.error("No se encontró el formulario, botón o tabla.");
        return;
    }

    const clientes = JSON.parse(
        localStorage.getItem("nexora_clientes") || "[]"
    );
    let clienteEditando = null;

    clientes.forEach(function (cliente) {
        añadirClienteATabla(cliente);
    });

    actualizarContadores();
buscador.addEventListener("input", function () {

    const texto = buscador.value.toLowerCase().trim();

    const filas = tabla.querySelectorAll("tr");

    filas.forEach(function (fila) {

        const datosVisibles = fila.textContent.toLowerCase();

        const cliente = clientes.find(function (c) {
            return c.nombre === fila.cells[0].textContent;
        });

        const datosCliente = cliente
            ? (cliente.telefono + " " + cliente.email).toLowerCase()
            : "";

        if (
            datosVisibles.includes(texto) ||
            datosCliente.includes(texto)
        ) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }

    });

});
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

               if (clienteEditando) {

            clienteEditando.nombre = cliente.nombre;
            clienteEditando.telefono = cliente.telefono;
            clienteEditando.email = cliente.email;
            clienteEditando.tipo = cliente.tipo;
            clienteEditando.inmueble = cliente.inmueble;
            clienteEditando.estado = cliente.estado;

            localStorage.setItem(
                "nexora_clientes",
                JSON.stringify(clientes)
            );

            formulario.reset();

            clienteEditando = null;

            boton.textContent = "Guardar cliente";

            location.reload();

        } else {

            añadirClienteATabla(cliente);

            clientes.push(cliente);

            localStorage.setItem(
                "nexora_clientes",
                JSON.stringify(clientes)
            );

            formulario.reset();

            actualizarContadores();

            alert("Cliente guardado correctamente en NEXORA");
        }
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

        const acciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "✏️ Editar";
botonEditar.addEventListener("click", function () {

    const campos = formulario.querySelectorAll("input, select");

    campos[0].value = cliente.nombre;
    campos[1].value = cliente.telefono;
    campos[2].value = cliente.email;
    campos[3].value = cliente.tipo;
    campos[4].value = cliente.inmueble;
    campos[5].value = cliente.estado;

    clienteEditando = cliente;

    boton.textContent = "Actualizar cliente";

    formulario.scrollIntoView({
        behavior: "smooth"
    });

});
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "🗑️ Eliminar";

        botonEliminar.addEventListener("click", function () {

            const confirmar = confirm(
                "¿Quieres eliminar este cliente?"
            );

            if (!confirmar) {
                return;
            }

            const posicion = clientes.indexOf(cliente);

            if (posicion !== -1) {
                clientes.splice(posicion, 1);
            }

            localStorage.setItem(
                "nexora_clientes",
                JSON.stringify(clientes)
            );

            fila.remove();

            actualizarContadores();

        });

        acciones.appendChild(botonEditar);
        acciones.appendChild(botonEliminar);

        fila.appendChild(nombre);
        fila.appendChild(tipo);
        fila.appendChild(inmueble);
        fila.appendChild(estado);
        fila.appendChild(acciones);

        tabla.appendChild(fila);
    }

    function actualizarContadores() {

        const filas = tabla.querySelectorAll("tr");

        let seguimiento = 0;
        let visitas = 0;

        filas.forEach(function (fila) {

            const estado = fila
                .querySelector(".estado")
                .textContent
                .trim();

            if (estado === "En seguimiento") {
                seguimiento++;
            }

            if (estado === "Visita programada") {
                visitas++;
            }
        });

        contadores[0].textContent = filas.length;
        contadores[1].textContent = seguimiento;
        contadores[2].textContent = visitas;
    }

});
