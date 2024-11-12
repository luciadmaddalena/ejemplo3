function iniciarFormulario(){
    const form = document.getElementById('presentacion');
    if(form){
        form.addEventListener('submit', enviarDatos);
        }
}

function enviarDatos(event){
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad')
    const color = document.getElementById('color').value;
    const fechaNac = document.getElementById('fechaNac').value;
    const terminos = document.getElementById('terminos').value;


const data = {nombre, apellido, edad, color, fechaNac, terminos}
console.log(data)

console.log('Datos enviados correctamente')
alert('Tu presentacion fue cargada correctamente: ')

}
function submit(){
    window.location.href = 'nuevo.html';
}


function volver(){
    window.location.href = 'index.html';
}
