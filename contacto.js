//DOM
console.dir(document);
console.dir(document.head);
console.dir(document.body);

// VARIABLES DOM
const formulario = document.getElementById("formulario");
const contFormulario = document.getElementById("contFormulario");
const saludoUsuario = document.getElementById("saludoUsuario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const celular = document.getElementById("celular");

//Formulario de contacto
// VARIABLES STORAGE
let nombreStorage = localStorage.getItem('nombreUsuario');
let apellidoStorage = localStorage.getItem('apellidoUsuario');
let celularStorage = localStorage.getItem('celularUsuario');
let apellidoSessionStorage = sessionStorage.getItem("apellidoSession");

// VARIABLES SESSION
let valorNombre = sessionStorage.getItem('valorNombre');
let valorApellido = sessionStorage.getItem('valorApellido');
let valorCelular = sessionStorage.getItem('valorCelular');



nombre.onchange = (e) => {
  (e.target.value);
  sessionStorage.setItem("valorNombre", e.target.value);
}

apellido.onchange = (e) => {
  sessionStorage.setItem("valorApellido", e.target.value);
}

celular.onchange = (e) => {
  sessionStorage.setItem("valorCelular", e.target.value);
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem('nombreUsuario', formulario.children[0].value);
  localStorage.setItem('apellidoUsuario', formulario.children[1].value);
  localStorage.setItem('celularUsuario', formulario.children[2].value);
  sessionStorage.setItem('apellidoSession', formulario.children[1].value);
  apellidoSessionStorage = formulario.children[1].value;
  nombreStorage = formulario.children[0].value;
  verificarFormulario();
});

const verificarFormulario = () => {
 (nombreStorage);
  if (nombreStorage && nombreStorage !== 'null') {
      ("La información ya existe");
      contFormulario.remove();
      saludoUsuario.innerHTML = `Hola ${nombreStorage} ${apellidoSessionStorage} gracias por comunicarte con nosotros, a la brevedad nos estaremos contactando.`;
  } else {
      ("La información no existe");
  }
}

const completarInformacion = () => {
  nombre.value = valorNombre;
  apellido.value = valorApellido;
  celular.value = valorCelular;
}

// CODIGO
verificarFormulario();
completarInformacion();
