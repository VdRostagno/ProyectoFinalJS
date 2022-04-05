//DOM
console.dir(document);
console.dir(document.head);
console.dir(document.body);

const container = document.getElementsByClassName("container");

//promesas del carrito de compras 
const itemsProductos = document.getElementById("items");

const insertarProductos = () => {
  return new Promise((resolve, reject) => {
    // SIMULANDO
    itemsProductos.innerHTML = "Cargando...";

    setTimeout(() => {
      // Petición de BE determina si es TRUE O FALSE
      const res = true;
      if (res) {
        resolve(Productos);
      } else {
        reject("Ha ocurrido un error");
      }
    }, 5000)
  }); 
}


//ARRAY DE CARRITO DE COMPRAS

//Defino los ARRAY 
const productosConsultora = ["Generacion de presupuesto", "Hosting y dominio", "Diseño de sitio", "Desarrollo y mantenimiento de la web","SEO y analytic", "Servicios de CM", "Creacion de logos"]

for (let i = 0; i < 7; i++) {
    (productosConsultora[i])
  }
  const arrayDesdeStorage = JSON.parse(localStorage.getItem("arrayProducto"));

container.innerHTML = arrayDesdeStorage;

  //Class de productos 
class Productos {
    constructor(producto, precio) {
        this.producto  = producto.toUpperCase();
        this.imagen = parseFloat(imagen);
        this.precio  = parseFloat(precio);
    }
  } 

  //Aplicacion de fetch y ajax

  function cargarCarrito (){
    (fetch('productos.json')
    .then (respuesta => respuesta.json() )
    .then (respuesta => {
      respuesta.forEach(respuesta=>{console.log(respuesta);
      });
    })
    )}

  cargarCarrito()

  //Comienzo de const carrito de compras
const addTocarritoComprasButtons = document.querySelectorAll('.addToCart');
addTocarritoComprasButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const borrarButton = document.querySelector('.borrarButton');
borrarButton.addEventListener('click', borrarButtonClicked);


const carritoComprasItemsContainer = document.querySelector(
  '.carritoComprasItemsContainer'
);

//comienzo de funciones carrito de compras
function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitulo = item.querySelector('.item-titulo').textContent;
  const itemPrecio = item.querySelector('.item-precio').textContent;
  const itemImagen = item.querySelector('.item-imagen').src;

  addItemTocarritoCompras(itemTitulo, itemPrecio, itemImagen);
}

function addItemTocarritoCompras(itemTitulo, itemPrecio, itemImagen) {
  const elementsTitle = carritoComprasItemsContainer.getElementsByClassName(
    'carritoComprasitemTitulo'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitulo) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.carritoComprasItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updatecarritoComprasTotal();
      return;
    }
  }

  const carritoComprasRow = document.createElement('div');
  const carritoComprasContent = `
  <div class="row carritoComprasItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImagen} class="shopping-cart-image">
                <h6 class="shopping-cart-item-titulo carritoComprasitemTitulo text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-precio mb-0 carritoComprasitemPrecio">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input carritoComprasItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    carritoComprasRow.innerHTML = carritoComprasContent;
    carritoComprasItemsContainer.append(carritoComprasRow);

    carritoComprasRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removecarritoComprasItem);

    carritoComprasRow
    .querySelector('.carritoComprasItemQuantity')
    .addEventListener('change', quantityChanged);

  updatecarritoComprasTotal();
}

function updatecarritoComprasTotal() {
  let total = 0;
  const carritoComprasTotal = document.querySelector('.carritoComprasTotal');

  const carritoComprasItems = document.querySelectorAll('.carritoComprasItem');

  carritoComprasItems.forEach((carritoComprasItem) => {
    const carritoComprasitemPrecioElement = carritoComprasItem.querySelector(
      '.carritoComprasitemPrecio'
    );
    const carritoComprasitemPrecio = Number(
      carritoComprasitemPrecioElement.textContent.replace('$', '')
    );
    const carritoComprasItemQuantityElement = carritoComprasItem.querySelector(
      '.carritoComprasItemQuantity'
    );
    const carritoComprasItemQuantity = Number(
      carritoComprasItemQuantityElement.value
    );
    total = total + carritoComprasitemPrecio * carritoComprasItemQuantity;
  });
  carritoComprasTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removecarritoComprasItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.carritoComprasItem').remove();
  updatecarritoComprasTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updatecarritoComprasTotal();
}

function comprarButtonClicked() {
  carritoComprasItemsContainer.innerHTML = '';
  updatecarritoComprasTotal();
}

function borrarButtonClicked() {
  carritoComprasItemsContainer.innerHTML = '';
  updatecarritoComprasTotal();
}


comprarButton.addEventListener('click', () =>{
  Swal.fire({
      icon: 'success',
      title: 'Tu compra se realizo con exito',
      text: 'Nos contactaremos en caso de necesitar envio',
    })
}
);
borrarButton.addEventListener('click', () =>{
  Swal.fire({
      title: 'Está seguro de vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No, no quiero'
  }).then((result) => {
(result);
      if (result.isConfirmed) {
          Swal.fire({
              title: 'Borrado!',
              icon: 'success',
              text: 'El carrito ha sido vaciado'
          })
      }
  })
})

