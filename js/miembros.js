//Funciones de validación
const validadorTexto = (texto) => texto && texto.trim().length >= 3 && texto.trim().length <= 100;
const validadorMail = (mail) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Verifica que tenga formato texto@texto.texto
    return mail && re.test(mail);
};
const validadorSelect = (opcion) => opcion && opcion !== "";

//Input dinamico (adicional) segun el tipo miembro que fue seleccionado
const tipoSelect = document.getElementById("tipo-miembro");
const containerExtra = document.getElementById("datos-extra");

//Cambia el input dinamico extra dependiendo del tipo de miembro seleccionado
const updateDatosExtra = () => {
    let tipo = tipoSelect.value;
    
    //limpiar el contenedor antes de agregar el nuevo input
    containerExtra.innerHTML = ""; 

    if (tipo === "Estudiante") {
        let label = document.createElement("label");
        label.innerText = "Carrera";
        let input = document.createElement("input");
        input.type = "text";
         //llamar asi al id para validarlo sin importar el tipo de miembro (solo cambia el label)
        input.id = "dato-dinamico";

        containerExtra.appendChild(label);
        containerExtra.appendChild(input);

    } else if (tipo === "Academico") {
        let label = document.createElement("label");
        label.innerText = "Departamento";
        let input = document.createElement("input");
        input.type = "text";
        input.id = "dato-dinamico";

        containerExtra.appendChild(label);
        containerExtra.appendChild(input);

    } else if (tipo === "Funcionario") {
        let label = document.createElement("label");
        label.innerText = "Cargo";
        let input = document.createElement("input");
        input.type = "text";
        input.id = "dato-dinamico";

        containerExtra.appendChild(label);
        containerExtra.appendChild(input);
    }
};

//Actualizar por si se cambia el tipo de miembro antes de enviar el formulario
tipoSelect.addEventListener("change", updateDatosExtra);


//Validar el formulario al hacer click en guardar
const validarFormMiembro = () => {
    //leer los valores de los inputs del html
    let nombreInput = document.getElementById("nombre-miembro");
    let emailInput = document.getElementById("email-miembro");

    //extrae lo escrito
    let nombre = nombreInput.value;
    let email = emailInput.value;
    
    let isValid = true;
    let msg = "Errores encontrados:\n";

    //Validar nombre
    if (!validadorTexto(nombre)) {
        //poner borde rojo y error
        nombreInput.style.borderColor = "red";
        msg += "- Nombre inválido (mín 3 letras, max 100)\n";
        isValid = false;
    } else {
        nombreInput.style.borderColor = "#ccc"; //Volver a color normal
    }

    //Validar email
    if (!validadorMail(email)) {
        emailInput.style.borderColor = "red";
        msg += "- Correo inválido (formato: usuario@dominio.extension)\n";
        isValid = false;
    } else {
        emailInput.style.borderColor = "#ccc";
    }

    //Seleccionar tipo de miembro
    if (!validadorSelect(tipoSelect.value)) {
        tipoSelect.style.borderColor = "red";
        msg += "- Debes seleccionar un tipo de miembro\n";
        isValid = false;
    } else {
        tipoSelect.style.borderColor = "#ccc";
        
        //Validar el input dinamico adicional
        //Solo se valida si se selecciono un tipo de miembro
        let inputDinamico = document.getElementById("dato-dinamico");
        if (inputDinamico) { //Si el input extra esta en pantalla...
            if (!validadorTexto(inputDinamico.value)) {
                inputDinamico.style.borderColor = "red";
                msg += "- Debes completar el campo específico de tu rol\n";
                isValid = false;
            } else {
                inputDinamico.style.borderColor = "#ccc";
            }
        }
    }

    // Resultado final
    if (isValid) {
        alert("¡Miembro registrado exitosamente!");
        //Limpiar el formulario una vez enviado
        document.getElementById("form-miembro").reset();
        containerExtra.innerHTML = ""; //Limpiar el imput dinamico
    } else {
        alert(msg);
    }
};

//Buscar el boton
let btnGuardar = document.getElementById("btn-miembro");

//Fue clickeado -> validar formulario
btnGuardar.addEventListener("click", validarFormMiembro);