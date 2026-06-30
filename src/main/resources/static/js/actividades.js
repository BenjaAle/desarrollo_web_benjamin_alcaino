//Verifica que no este vacio y que no sea la opcion por defecto
const validadorSelect = (opcion) => opcion && opcion !== "";

//minimo 3 caracteres para texto
const validadorTexto = (texto) => texto && texto.trim().length >= 3;

//Es numero mayor a 0 y rechaza notacion cientifica (para que no acepte "e")
const validadorNumeros = (num) => {
  //Que no sea vacio
  if (!num) return false;

  // Rechazar "e" o "E"
  if (num.toString().toLowerCase().includes("e")) return false;

  // Verificar que sea número mayor a 0
  return !isNaN(num) && parseInt(num) > 0;
};

//Lista de archivos tiene al menos 1 elemento y no más de 5
const validadorArchivos = (files) => files && files.length > 0 && files.length <= 5;

// Validador de días: verifica que contenga al menos un día válido
//Acepta  "LUNES, martes Y MIERCOLES"
const validadorDias = (dias) => {
  //Que no esté vacio
  if (!dias || dias.trim().length === 0) return false;

  const diasValidos = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  //Minuscula
  const diasLower = dias.toLowerCase();

  //Iterar con some sobre diasValidos (le basta con encontrar uno)
  return diasValidos.some((dia) => diasLower.includes(dia));
};

// Validador de URL: si tiene contenido, debe ser una URL válida (opcional)
const validadorURL = (url) => {
  // Si está vacío esta bien ya que es opcional
  if (!url || url.trim().length === 0) return true;

  // Si tiene contenido, validar que sea URL válida
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const validarFormActividad = () => {
  //Obtener los inputs ingresados en el formulario
  let categoriaInput = document.getElementById("categoria-act");
  let diasInput = document.getElementById("dias-act");
  let horasInput = document.getElementById("horas-act");
  let archivosInput = document.getElementById("archivos-act");

  //Obtener enlace opcional
  let linkInput = document.getElementById("link-act");

  let isValid = true;
  let msg = "Errores en el formulario de actividad:\n";

  // Validar categoría
  if (!validadorSelect(categoriaInput.value)) {
    categoriaInput.style.borderColor = "red";
    msg += "- Selecciona una categoría válida\n";
    isValid = false;
  } else {
    categoriaInput.style.borderColor = "#ccc";
  }

  //Validar días (que contenga al menos un día válido)
  if (!validadorDias(diasInput.value)) {
    diasInput.style.borderColor = "red";
    msg += "- Selecciona un día válido\n";
    isValid = false;
  } else {
    diasInput.style.borderColor = "#ccc";
  }

  //Validar horas (que sea un número mayor a 0 y que no contenga "e" o "E")
  if (!validadorNumeros(horasInput.value)) {
    horasInput.style.borderColor = "red";
    msg += "- Ingresa una cantidad de horas validas\n";
    isValid = false;
  } else {
    horasInput.style.borderColor = "#ccc";
  }

  //Validar archivos
  //propiedad .files es la lista de archivos
  if (!validadorArchivos(archivosInput.files)) {
    archivosInput.style.borderColor = "red";
    msg += "- Debes subir al menos una foto o video\n";
    isValid = false;
  } else {
    archivosInput.style.borderColor = "#ccc";
  }

  // Validar enlace (opcional, pero si se ingresa debe ser URL válida)
  if (!validadorURL(linkInput.value)) {
    linkInput.style.borderColor = "red";
    msg += "- El enlace debe ser una URL válida (ej: https://ejemplo.com)\n";
    isValid = false;
  } else {
    linkInput.style.borderColor = "#ccc";
  }

  // Validación final
  if (isValid) {
    document.getElementById("errores-js").innerText = ""; // Limpiar
    document.getElementById("form-actividad").submit();
  } else {
    // Escribir el error en el html
    document.getElementById("errores-js").innerText = msg;
  }
};

//Conectar el botón de guardar con la función validadora
let btnGuardarAct = document.getElementById("btn-actividad");
btnGuardarAct.addEventListener("click", validarFormActividad);
