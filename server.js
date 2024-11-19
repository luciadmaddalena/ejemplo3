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


//iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
