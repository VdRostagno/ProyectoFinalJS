document.addEventListener('DOMContentLoaded', () => {

  // Variables carrito
  const carritoDeCompras = [
      {
          id: 1,
          nombre: 'Creacion de logos',
          precio: 1000,
          imagen: "imagenes/creacion_logos.jpg"
      },
      {
        id: 2,
        nombre: "Desarrollo web",
        precio: 5000,
        imagen: "imagenes/desarrollo_web.png"
      },
      {
        id: 3,
        nombre: "Diseño de sitio",
        precio: 5000,
        imagen: "imagenes/diseño_sitio.jpg"
      },
      {
        id: 4,
        nombre: "Presupuesto",
        precio: 1000,
        imagen: "imagenes/generacion_presupuesto.jpg"
      },
      {
        id: 5,
        nombre: "Manejo de hosting y dominio",
        precio: 1000,
        imagen: "imagenes/hosting_dominio.png"
      },
      {
        id: 6,
        nombre: "Seo y analityc",
        precio: 1000,
        imagen: "imagenes/seo_analityc.jpg"
      },
      {
        id: 7,
        nombre: "Servicios de CM",
        precio: 1000,
        imagen: "imagenes/servicio_cm.jpg"
      }
  ];


  //variables DOM
  let carrito = [];
  const divisa = '$';
  const items = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const total = document.querySelector('#total');
  const botonComprar = document.querySelector('#boton-comprar');
  const botonVaciar = document.querySelector('#boton-vaciar');
  const miLocalStorage = window.localStorage;

  // Funciones

  //Productos dibujados a partir de la varrible carrito

  function renderizarProductos() {
    carritoDeCompras.forEach((info) => {
          // Estructura
          const carritoCompras = document.createElement('div');
          // Body
          const carritoComprasCardBody = document.createElement('div');
          // Titulo
          const carritoComprasTitulo = document.createElement('h5');
          carritoComprasTitulo.textContent = info.nombre;
          // Imagen
          const carritoComprasImagen = document.createElement('img');
          carritoComprasImagen.setAttribute('src', info.imagen);
          // Precio
          const carritoComprasPrecio = document.createElement('p');
          carritoComprasPrecio.textContent = `${divisa}${info.precio}`;
          // Boton 
          const carritoComprasBoton = document.createElement('button');
          carritoComprasBoton.classList.add('btn', 'btn-primary');
          carritoComprasBoton.textContent = 'Añadir producto al carrito';
          carritoComprasBoton.setAttribute('marcador', info.id);
          carritoComprasBoton.addEventListener('click', comprar);
          // Insertamos
          carritoComprasCardBody.appendChild(carritoComprasImagen);
          carritoComprasCardBody.appendChild(carritoComprasTitulo);
          carritoComprasCardBody.appendChild(carritoComprasPrecio);
          carritoComprasCardBody.appendChild(carritoComprasBoton);
          carritoCompras.appendChild(carritoComprasCardBody);
          items.appendChild(carritoCompras);
      });
  }

 

  //Se dibujan los productos guardados en el carrito
  
  function renderizarCarrito() {
      DOMcarrito.textContent = '';
      const carritoSinDuplicados = [...new Set(carrito)];
      carritoSinDuplicados.forEach((item) => {
          const miItem = carritoDeCompras.filter((itemCarritoCompras) => {
              return itemCarritoCompras.id === parseInt(item);
          });
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              return itemId === item ? total += 1 : total;
          }, 0);
          const carritoCompras = document.createElement('li');
          carritoCompras.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} -${divisa}${miItem[0].precio}`;
          const Button = document.createElement('button');
          Button.addEventListener('click', borrarItemCarrito);
          carritoCompras.appendChild(Button);
          DOMcarrito.appendChild(carritoCompras);
      });
       total.textContent = calcularTotal();
  }

   //Se añade un producto al carrito de la compra
    function comprar(evento) {
      carrito.push(evento.target.getAttribute('marcador')) 
      renderizarCarrito();
      guardarCarritoEnLocalStorage();
  }
  // Se borra un elemento del carrito
  function borrarItemCarrito(evento) {
      const id = evento.target.dataset.item;
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });
      renderizarCarrito();
      guardarCarritoEnLocalStorage();

  }

  //Precio total

  function calcularTotal() {
      return carrito.reduce((total, item) => {
          const miItem = carritoDeCompras.filter((itemCarritoCompras) => {
              return itemCarritoCompras.id === parseInt(item);
          });
          return total + miItem[0].precio;
      }, 0).toFixed(2);
  }

  //Se vacia el carrito y se vuelve a dibujar
  
  function vaciarCarrito() {
      carrito = [];
      renderizarCarrito();
      localStorage.clear();

  }

  function guardarCarritoEnLocalStorage () {
      miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
      if (miLocalStorage.getItem('carrito') !== null) {
          carrito = JSON.parse(miLocalStorage.getItem('carrito'));
      }
  }
  //Aplicacion de fetch y ajax

  function cargarCarrito (){
    (fetch('productos.json')
    .then (respuesta => respuesta.json() )
    .then (respuesta => {
      respuesta.forEach(respuesta=>{(respuesta);
      });
    })
    )}

  cargarCarrito()

  
  // Eventos
  botonComprar.addEventListener('click', vaciarCarrito); 
botonComprar.addEventListener('click',() =>{
  Swal.fire({
      icon: 'success',
      title: 'Tu compra se realizo con exito',
      text: 'Nos contactaremos en caso de necesitar envio',
    })
}
);;

  botonVaciar.addEventListener('click', vaciarCarrito); 
  
  botonVaciar.addEventListener('click',() =>{
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

  // Inicio
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});