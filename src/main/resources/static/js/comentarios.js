function cargarComentarios() {
  fetch(`/api/comentarios/${ACTIVIDAD_ID}`)
    .then((r) => r.json())
    .then((datos) => {
      let html = "";

      datos.forEach((c) => {
        html += `
                <p>
                <b>${c.nombre}</b>
                (${c.fecha})
                <br>
                ${c.texto}
                </p>
                <hr>
                `;
      });

      document.getElementById("lista-comentarios").innerHTML = html;
    });
}

document.getElementById("btn-comentario").addEventListener("click", () => {
  let nombre = document.getElementById("nombre-comentario").value;

  let texto = document.getElementById("texto-comentario").value;

  fetch(`/api/comentarios/${ACTIVIDAD_ID}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nombre,
      texto,
    }),
  })
    .then((r) => r.json())
    .then(() => {
      document.getElementById("nombre-comentario").value = "";

      document.getElementById("texto-comentario").value = "";

      cargarComentarios();
    });
});

cargarComentarios();
