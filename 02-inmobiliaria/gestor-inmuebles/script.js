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
  let inmuebleEditando = null;
   const buscador = document.querySelector("#buscadorInmuebles");

if (buscador) {
    buscador.addEventListener("input", function () {
        mostrarInmuebles();
    });
} 
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

   if (inmuebleEditando) {

    const posicion = inmuebles.findIndex(function (item) {
        return item.referencia === inmuebleEditando;
    });

    if (posicion !== -1) {
        inmuebles[posicion] = inmueble;
    }

    inmuebleEditando = null;
    boton.textContent = "Guardar inmueble";

} else {

    const existe = inmuebles.some(function (item) {
        return item.referencia === inmueble.referencia;
    });

    if (existe) {
        alert("Ya existe un inmueble con esa referencia.");
        return;
    }

    inmuebles.push(inmueble);
}



  


       

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
const textoBusqueda = buscador
    ? buscador.value.toLowerCase().trim()
    : "";

const inmueblesFiltrados = inmuebles.filter(function (inmueble) {

    return (
        inmueble.referencia.toLowerCase().includes(textoBusqueda) ||
        inmueble.tipo.toLowerCase().includes(textoBusqueda) ||
        inmueble.operacion.toLowerCase().includes(textoBusqueda) ||
        inmueble.zona.toLowerCase().includes(textoBusqueda)
    );

});
    lista.innerHTML = "";

  if (inmueblesFiltrados.length === 0) {
    lista.innerHTML = "<p>No se encontraron inmuebles.</p>";
    return;
} 

 inmueblesFiltrados.forEach(function (inmueble) { 

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
const botonEditar = document.createElement("button");

botonEditar.textContent = "✏️ Editar";

botonEditar.style.marginTop = "10px";
botonEditar.style.padding = "8px 12px";
botonEditar.style.border = "none";
botonEditar.style.borderRadius = "6px";
botonEditar.style.cursor = "pointer";

botonEditar.addEventListener("click", function () {

    const campos = formulario.querySelectorAll("input, select");

    campos[0].value = inmueble.referencia;
    campos[1].value = inmueble.tipo;
    campos[2].value = inmueble.operacion;
    campos[3].value = inmueble.zona;
    campos[4].value = inmueble.precio;
    campos[5].value = inmueble.superficie;
    campos[6].value = inmueble.habitaciones;
    campos[7].value = inmueble.banos;

   inmuebleEditando = inmueble.referencia;

    boton.textContent = "Actualizar inmueble";

    formulario.scrollIntoView({
        behavior: "smooth"
    });
});
const botonEliminar = document.createElement("button");

botonEliminar.textContent = "🗑️ Eliminar";

botonEliminar.style.marginTop = "10px";
botonEliminar.style.marginLeft = "10px";
botonEliminar.style.padding = "8px 12px";
botonEliminar.style.border = "none";
botonEliminar.style.borderRadius = "6px";
botonEliminar.style.cursor = "pointer";

botonEliminar.addEventListener("click", function () {

    if (confirm("¿Seguro que quieres eliminar este inmueble?")) {

        const posicion = inmuebles.findIndex(function (item) {
            return item.referencia === inmueble.referencia;
        });

        if (posicion !== -1) {
            inmuebles.splice(posicion, 1);

            localStorage.setItem(
                "nexora_inmuebles",
                JSON.stringify(inmuebles)
            );

            mostrarInmuebles();
        }
    }
});

tarjeta.appendChild(botonEditar);
   tarjeta.appendChild(botonEliminar);     
        lista.appendChild(tarjeta);

    });
}

mostrarInmuebles();
});
