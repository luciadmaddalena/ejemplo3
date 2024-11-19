const express = require('express');
const path = require('path');
const app = express ();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));


//ruta de ejemplo
app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express');
});

//ruta para servir el archivo logueo.html
app.get('/inicio', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html')); // Servir 'logueo.html' desde la carpeta 'public'
}); 


// manejar la solicitud POST para /logueo
app.post('/presentacion', (req, res) => {
    const { nombre, apellido, edad, color, fechaNac, terminos } = req.body;

//aca vamos a agregar una llamada a la BD
if (nombre === 'lucia') {
    res.json({ message: '¡Bienvenido!' });
} else {
    res.status(401).json({ message: 'Credenciales incorrectas'})
}
}); 

app.get('/bienvenido', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
