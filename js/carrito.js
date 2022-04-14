/* ####### VARIABLES ####### */
/* Tabla carrito automática */
const asideLeft = document.querySelector('.aside-left');
const carrito = document.querySelector('.carrito');
//console.log(carrito);


/* ####### ESCUCHA DE EVENTOS ####### */
/* Tabla carrito automática */
asideLeft.addEventListener('mouseover', aparererTabla);
carrito.addEventListener('click', desapareceTabla);





/* ####### FUNCIONES ####### */
/* Tabla carrito automática */
function aparererTabla(e) {
    //console.log(e.target.classList);
    if (e.target.classList.contains('control-carrito')) {
        //   console.log('Ha pasado por encima');
          carrito.classList.add('mover-carrito');
    }

}

function desapareceTabla(e) {
    if (e.target.classList.contains('cerrar-carrito')) {
        carrito.classList.remove('mover-carrito');
  }


}

