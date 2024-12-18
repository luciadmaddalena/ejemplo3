//funcion para escuchar un evento
function iniciarFormulario() {
    const form = document.getElementById('presentacion'); // toma el formulario por id
    if(form) {
        form.addEventListener('submit', enviarDatos); // asocia el evento 'submit' al formulario 
    }
}
function enviarDatos(event) {
    event.preventDefault(); // evita el envío del formulario por defecto

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const color = document.getElementById('color').value;
    const fechaNac = document.getElementById('fechaNac').value;
    const terminos = document.getElementById('terminos').checked;  // Asegúrate de que esto sea un booleano

    // Crear un objeto con los datos
    const data = { nombre, apellido, edad, color, fechaNac, terminos };

    // Enviar los datos al servidor
    fetch('/presentacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Asegura que es JSON
        },
        body: JSON.stringify(data), // Convertir el objeto en una cadena JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json();  // Cambié `response.text()` por `response.json()`
    })
    .then(data => {
        console.log(data);  // Log de los datos devueltos por el servidor
        window.location.href = '/nuevo';  // Redirigir a la página deseada
    })
    .catch(error => {
        mostrarErrorModal(error.message);  // Mostrar el mensaje de error si ocurre uno
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

function volver(){
    window.location.href = 'index.html';
}
