function iniciarFormulario(){
    const form = document.getElementById('presentacion');
    if(form){
        form.addEventListener('submit', enviarDatos);
        }
}

function enviarDatos(event){
    event.preventDefault();

//obtener los valores de formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad')
    const color = document.getElementById('color').value;
    const fechaNac = document.getElementById('fechaNac').value;
    const terminos = document.getElementById('terminos').value;


//crea un objeto con los datos
const data = {nombre, apellido, edad, color, fechaNac, terminos};
console.log(data);

/*
console.log('Datos enviados correctamente')
alert('Tu presentacion fue cargada correctamente: ')

}
function submit(){
    window.location.href = 'nuevo.html';
}
*/


//enviar los datos al servidor
fetch('/presentacion', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', //asegura que es JSON
    },
    body: JSON.stringify(data), //Convertir el objeto en una cadeja JSON
})
.then(response => {
    if(!response.ok) {
        throw new Error('Credenciales icorrectas');
    }
    return response.text();
})
.then(data => {
    window.location.href = 'nuevo.html';
})
.catch(error => {
    mostrarErrorModal(error.message);
});
}

//funcion para mostrar el modal con error
function mostrarErrorModal(mensaje) {
    const modal = document.getElementById('miModal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = mensaje;
    modal.style.display = 'block'; //mostrar el modal
}

//funcion para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('miModal');
    modal.style.display = 'none'; //ocultar el modal
}

function redirigir(event) {
    event.preventDefault();
    window.location.href = "nuevo.html"; 
}

function volver(){
    window.location.href = 'index.html';
}
