/* ####### VARIABLES ####### */
/* Leer datos de equipos */
// Lista de equipos
const listaEquipos = document.querySelector('#lista-equipos');
// Donde se almacenaran la lista de equipos (<tbody></tbody>)
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// Botón limpiar carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito');
// Llenar carrito
let articulosCarrito = [];





/* ####### ESCUCHA DE EVENTOS ####### */
/* Leer datos de equipos */
cargarCarritoListener();
function cargarCarritoListener() {
    // Agrega un equipo presionando el boton agreagar al carrito
    listaEquipos.addEventListener('click', agregarEquipo)

    // Elimina un equipo del carrito
    carrito.addEventListener('click', eliminarEquipo)

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        let articulosCarrito = []; // Resetear el arreglo
        limpiarHtml(); // Eliminar el HTML
    })
}




/* ####### FUNCIONES ####### */
/* Leer datos de equipos */
function agregarEquipo(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    if (e.target.classList.contains('btn-cards')) {
        //console.log('Pulsaste el botón agregar a carrito');
        //console.log(e.target);
        //console.log(e.target.parentElement.parentElement);
        const equipoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(equipoSeleccionado)
    }
}


/* Eliminar equipos */
function eliminarEquipo(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const equiposId = e.target.getAttribute('data-id')

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(equipos => equipos.id !== equiposId)

        carritoHtml();
    }

}

/* Leer contenido HTML Y extraer información  */
function leerDatosCurso(equipos) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso
    const infoEquipos = {
        imagen: equipos.querySelector('img').src,
        titulo: equipos.querySelector('h3').textContent,
        precio: equipos.querySelector('span').textContent,
        id: equipos.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    //console.log(infoCurso);

    // Revisa si un curso ya existe
    const existe = articulosCarrito.some(equipos => equipos.id === infoEquipos.id)
    if (existe) {
        // Actualizamos la cantidad
        const equipos = articulosCarrito.map(equipos => {
            if (equipos.id === infoEquipos.id) {
                equipos.cantidad++;
                return equipos; // Retorna objeto actualizado
            }else {
                return equipos; // retorna objetos no duplicados
            }
        });

        articulosCarrito = [...equipos];
    }else {
        // Agregar elementos al arreglo articulosCarrito
        articulosCarrito = [...articulosCarrito, infoEquipos]
        //console.log(articulosCarrito);
    }
    carritoHtml();
}


/* Pasar los datos al menu desplegable carrito en el HTML */
function carritoHtml() {
    // Limpiar HTML duplicado
    limpiarHtml();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(equipos => {
        //const {imagen, titulo, precio, id} = equipos;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${equipos.imagen}" width = "40"></td>
        <td>${equipos.titulo}</td>
        <td>${equipos.precio}</td>
        <td>${equipos.cantidad}</td>
        <td><button class="borrar-curso" data-id=${equipos.id}>X</button></td>
        `
        ;

        // Agrega el HTML en el carrito
        contenedorCarrito.appendChild(row);
    })
}


/* Elimina los cursos repetidos del tbody */
function limpiarHtml() {
    // Forma lenta
    //contenedorCarrito.innerHTML = '';

    // Forma rápida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}