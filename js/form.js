/* ####### VARIABLES ####### */
/* Deshabilitar botón submit */
const btnEnviar = document.querySelector('#enviar');
//console.log(btnEnviar);

/* Constantes inputs */
const nombre = document.querySelector('#name');
const asunto = document.querySelector('#subject');
const correo = document.querySelector('#mail');
const mensaje = document.querySelector('#msg');

/* Seleccionar formulario */
const formulario = document.querySelector('form');

/* Expresión regular */
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/




/* ####### ESCUCHA DE EVENTOS ####### */
/* Función que inicia cuando se carga el documento HTML  */
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    nombre.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    correo.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar correo
    formulario.addEventListener('submit', enviarCorreo);
}





/* ####### FUNCIONES ####### */
/* Deshabilitar botón submit */
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('disabled');
}

// Validar formulario
function validarFormulario(e) {
    // Validar campos vacios
    if (e.target.value.length > 0) {
        // Elimina el cuadro de error
        const error = document.querySelector('.mensaje-error');
        if (error) {
            error.remove();
        }



        //console.log('Se ha escrito algo...');
        e.target.classList.remove('campo-vacio');
        e.target.classList.add('mensaje-correcto');

    }else{
        // e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('mensaje-correcto');
        e.target.classList.add('campo-vacio');
        textoError('Todos los campos son obligatorios!!');
    }

    // Validar correo
    // Método 1

    // if (e.target.type === 'email') {
        //console.log('Es un campo email');
        // Buscar una @
        //const arroba = e.target.value.indexOf('@');
        //console.log(arroba);
        // if (arroba < 0) {
        //     textoError('El correo no es valido!!');
        // }
        //}

    // Método 2
    if (e.target.type === 'email') {

        if (er.test(e.target.value)) {
            //console.log('Correo válido!!');
        // Elimina el cuadro de error
        const error = document.querySelector('.mensaje-error');
        if (error) {
            error.remove();
        }


        e.target.classList.remove('campo-vacio');
        e.target.classList.add('mensaje-correcto');

        } else {
            e.target.classList.remove('mensaje-correcto');
            e.target.classList.add('campo-vacio');

            textoError('El correo no es valido!!');

        }
    }

    // Habilita botón envío
    if (er.test(correo.value) && asunto.value !== "" && correo.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('disabled');
    }

}

// Mostrar texto indicando el tipo de error
function textoError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensaje-error', 'duplicado');
    // Evitar se duplique texto error
    const duplicado = document.querySelectorAll('.duplicado');
    if (duplicado.length === 0 ) {
        formulario.appendChild(mensajeError);
    }

}

// Enviar correo
function enviarCorreo(e) {
    e.preventDefault();
    //console.log('Enviando...');

    // Mostrar spinner
    const spinner = document.querySelector('#spinn');
    spinner.style.display = 'block';

    // Ocultar texto final
    const finalText = document.querySelector('#mensaje-enviado');
    finalText.style.display = 'none';

    // Después de 3 segundos ocultar eñl spineer y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje enviado
        // const enviado = document.createElement('p');
        // enviado.textContent = 'Mensaje enviado correctamente!!';
        // formulario.insertBefore(enviado, spinner);

        console.log(finalText);
        finalText.style.display = 'block';


        setTimeout(() => {
            finalText.style.display = 'none';
            resetearFormulario();
        }, 3000)
    }, 3000);
}

// Resetear formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}
//miguel@miguel.com

