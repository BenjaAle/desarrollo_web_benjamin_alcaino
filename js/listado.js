//Datos de actividades
const actividades = [
  {
    id: 1,
    nombre: "Benjamin Alcaino",
    actividad: "Ajedrez",
    categoria: "Recreativa",
    foto: "ajedrez.avif",
  },
  {
    id: 2,
    nombre: "Jose Miguel",
    actividad: "Pintura",
    categoria: "Artistica",
    foto: "pintura.avif",
  },
  {
    id: 3,
    nombre: "Amaranta Espinoza",
    actividad: "Fútbol",
    categoria: "Deportiva",
    foto: "futbol.avif",
  },
  {
    id: 4,
    nombre: "Matias Cifuentes",
    actividad: "Taller de Robótica",
    categoria: "Tecnologica",
    foto: "robot.avif",
  },
  {
    id: 5,
    nombre: "Joaquin Figueroa",
    actividad: "Club de Lectura",
    categoria: "Social",
    foto: "libro.avif",
  },
];

let paginaActual = 1;
const elementosPorPagina = 3;

const actualizarTabla = () => {
  let filtro = document.getElementById("filtro-tipo").value; //Deportiva, recreativa, etc
  let ordenamiento = document.getElementById("ordenar-por").value;

  //filtrar
  let datosFiltrados =
    filtro === "Todos"
      ? actividades //Si es todo, muestra todo, sino deja las que categoria = filtro
      : actividades.filter((act) => act.categoria === filtro);

  //Ordenar (copia del array original)
  let datosOrdenados = [...datosFiltrados];

  if (ordenamiento === "nombre") {
    datosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre)); // A-Z
  } else if (ordenamiento === "nombre-desc") {
    datosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre)); // Z-A
  } else if (ordenamiento === "actividad") {
    datosOrdenados.sort((a, b) => a.actividad.localeCompare(b.actividad)); // A-Z por actividad
  }

  //Pagina actual (slice)
  let inicio = (paginaActual - 1) * elementosPorPagina; //inicio slice
  let fin = inicio + elementosPorPagina;                //fin slice
  let datosPagina = datosOrdenados.slice(inicio, fin);  //Datos que se muestran en la pagina actual

  //Dibujo de la tabla
  let cuerpoTabla = document.getElementById("cuerpo-tabla");
  cuerpoTabla.innerHTML = ""; // Limpiar tabla antes de agregar filas nuevas

  datosPagina.forEach((act) => { //cada actividad de la pagina actual...
    let fila = document.createElement("tr"); //se vuelve una fila de la tabla
    fila.style.borderBottom = "1px solid #ddd"; //Estilo de borde para separar filas
    fila.style.cursor = "pointer"; //Cambia el cursor para que parezca clickeable

    //Al hacer clic en la fila, lo manda a detalle.html pasando el ID por la URL
    fila.addEventListener("click", () => {
      window.location.href = `detalle.html?id=${act.id}`;
    });

    // Crear columnas (td)
    let tdNombre = document.createElement("td");
    tdNombre.innerText = act.nombre;
    tdNombre.style.padding = "10px";

    let tdActividad = document.createElement("td");
    tdActividad.innerText = act.actividad;
    tdActividad.style.padding = "10px";

    let tdCategoria = document.createElement("td");
    tdCategoria.innerText = act.categoria;
    tdCategoria.style.padding = "10px";

    let tdFoto = document.createElement("td");
    tdFoto.innerHTML = `<img src="../imagenes/${act.foto}" alt="Foto" width="50" style="border-radius: 4px;">`;
    tdFoto.style.padding = "10px";

    // Agregar columnas a la fila
    fila.appendChild(tdNombre);
    fila.appendChild(tdActividad);
    fila.appendChild(tdCategoria);
    fila.appendChild(tdFoto);

    // Agregar fila a la tabla
    cuerpoTabla.appendChild(fila);
  });

  //Calcular total de paginas para mostrar el texto de pagina actual
  //Ej: Pagina 1 de 2, Pagina 2 de 2, etc
  //redondeo superior y se usa ||1 por si no hay datos y diga pagina 1 de 1 
  let totalPaginas = Math.ceil(datosOrdenados.length / elementosPorPagina) || 1;
  document.getElementById("texto-pagina").innerText =
    `Página ${paginaActual} de ${totalPaginas}`;
};

//Al cambiar el filtro u ordenamiento vuelve a la pagina 1 y se actualiza la tabla 
document.getElementById("filtro-tipo").addEventListener("change", () => {
  paginaActual = 1;
  actualizarTabla();
});

document.getElementById("ordenar-por").addEventListener("change", () => {
  paginaActual = 1;
  actualizarTabla();
});

//Boton de anterior
document.getElementById("btn-anterior").addEventListener("click", () => {
  if (paginaActual > 1) { //Si no estoy en la primera, puedo retroceder
    paginaActual--;
    actualizarTabla();
  }
});

//Boton de siguientr: Si no estoy en la ultima pagina, puedo avanzar
document.getElementById("btn-siguiente").addEventListener("click", () => {
  let filtro = document.getElementById("filtro-tipo").value;
  let datosFiltrados =
    filtro === "Todos"
      ? actividades
      : actividades.filter((act) => act.categoria === filtro);

  let totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina) || 1;

  if (paginaActual < totalPaginas) {
    paginaActual++;
    actualizarTabla();
  }
});

//Mostrar tabla al cargar la pagina
window.onload = actualizarTabla;
