document.addEventListener("DOMContentLoaded", () => {
    // Obtener la información del HTML
    const inputBuscador = document.getElementById("input-buscador");
    const seccionResultados = document.getElementById("seccion-resultados");
    const bodyResultados = document.getElementById("body-resultados");
    const mensajeResultados = document.getElementById("mensaje-resultados");
    const tablaResultados = document.getElementById("tabla-resultados");

    // Destacar el texto que coincide con la búsqueda
    const destacarTexto = (textoBase, palabraBuscada) => {
        if (!textoBase) return ""; // descripcion vacia -> vacio
        // Que no afecte mayuscula/minuscula
        const regex = new RegExp(`(${palabraBuscada})`, "gi");
        // Reemplazar la coincidencia con <mark> para resaltar
        return textoBase.replace(regex, "<mark>$1</mark>");
    };

    // Escuchar cada vez que el usuario teclee algo en el input
    inputBuscador.addEventListener("input", (evento) => {
        const keyword = evento.target.value.trim(); // Obtener el texto sin espacios extra

        // Cuando hayan 3 caracteres...
        if (keyword.length >= 3) {
            
            // Llamado asincronico a Spring Boot
            fetch(`/api/actividades/buscar?q=${encodeURIComponent(keyword)}`)
                .then(response => response.json())
                .then(data => {
                    // Mostrar la seccion de resultados
                    seccionResultados.style.display = "block";
                    bodyResultados.innerHTML = ""; // Limpiar resultados anteriores

                    // Si la lista viene vacía
                    if (data.length === 0) {
                        mensajeResultados.innerHTML = "<p style='color: red; font-weight: bold;'>No se encontraron actividades.</p>";
                        tablaResultados.style.display = "none"; // Ocultar tabla
                    } else {
                        // Si hay resultados
                        mensajeResultados.innerHTML = "";
                        tablaResultados.style.display = "table";

                        // Recorrer el JSON y construimr las filas de la tabla
                        data.forEach(act => {
                            const tr = document.createElement("tr");

                            // Destacar texto que calza en nombre, descripcion y comuna
                            const comunaDestacada = destacarTexto(act.comuna, keyword);
                            const nombreDestacado = destacarTexto(act.nombre, keyword);
                            const descripcionDestacada = destacarTexto(act.descripcion, keyword);

                            // El botón evaluar se mostrará si la nota es "-"
                            let botonEvaluar = act.nota === "-" 
                                ? `<button class="btn-evaluar" data-id="${act.id}">Evaluar</button>` 
                                : ``;

                            tr.innerHTML = `
                                <td>${act.miembro}</td>
                                <td>${act.dia}</td>
                                <td>${act.tipo}</td>
                                <td>${comunaDestacada}</td>
                                <td>${nombreDestacado}</td>
                                <td>${descripcionDestacada}</td>
                                <td>${act.nota}</td>
                                <td>${botonEvaluar}</td>
                            `;
                            bodyResultados.appendChild(tr);
                        });
                    }
                })
                .catch(error => {
                    console.error("Hubo un problema con la operación:", error);
                });

        } else {
            // Si el usuario borra y quedan menos de 3 caracteres, ocultar todo
            seccionResultados.style.display = "none";
            bodyResultados.innerHTML = "";
        }
    });      

bodyResultados.addEventListener("click", (evento) => {
        
        // Usuario hace click en evaluar
        if (evento.target.classList.contains("btn-evaluar")) {
            const btn = evento.target;
            const actividadId = btn.getAttribute("data-id");
            const tdAcciones = btn.parentElement;

            // Reemplazamos el botón por un input, un botón guardar y un contenedor para errores
            tdAcciones.innerHTML = `
                <div class="contenedor-evaluar">
                    <div class="fila-inputs">
                        <input type="number" min="1" max="7" id="input-nota-${actividadId}" class="input-nota-dinamico">
                        <button class="btn-guardar-nota" data-id="${actividadId}">Guardar</button>
                    </div>
                    <span id="error-nota-${actividadId}" class="mensaje-error-nota"></span>
                </div>
            `;
        }

        // Usuario hace click en guardar nota
        if (evento.target.classList.contains("btn-guardar-nota")) {
            const btnGuardar = evento.target;
            const actividadId = btnGuardar.getAttribute("data-id");
            
            // Capturar los elementos para validar y mostrar errores
            const inputNota = document.getElementById(`input-nota-${actividadId}`);
            const spanError = document.getElementById(`error-nota-${actividadId}`);
            
            // Referencias a las celdas de la tabla para actualizarlas después
            const tdAcciones = btnGuardar.closest('td');
            const tdNota = tdAcciones.previousElementSibling;

            const notaTexto = inputNota.value.trim();

            // Que sea entre 1 y 7
            const esValido = /^[1-7]$/.test(notaTexto);

            if (!esValido) {
                spanError.innerText = "La nota debe ser un número entre 1 y 7.";
                spanError.style.display = "block";
                return; // No continuar el fetch si la nota es inválida
            }

            // Si es válido, ocultar el mensaje de error
            spanError.style.display = "none";

            // Enviar la nota al back con fetch
            fetch(`/api/actividades/${actividadId}/evaluar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nota: notaTexto })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualizar la vista en caso de exito
                    tdNota.innerText = data.nota; // Poner la nota en la columna correspondiente
                    tdAcciones.innerHTML = `<span class="mensaje-exito">Evaluado</span>`; // Mensaje de éxito
                } else {
                    // Error
                    spanError.innerText = data.error;
                    spanError.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error en el fetch de evaluación:", error);
                spanError.innerText = "Error de conexión al guardar.";
                spanError.style.display = "block";
            });
        }
    });
});