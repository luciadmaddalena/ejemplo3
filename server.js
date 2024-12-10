const express = require('express');
const path = require('path');
const app = express ();
const port = 3000;

const { ingresarPresentacion } = require('./action');


app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

/*
//ruta de ejemplo
app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express');
});
*/

//ruta para servir el archivo logueo.html
app.get('/inicio', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html')); // Servir 'logueo.html' desde la carpeta 'public'
}); 


// manejar la solicitud POST para /logueo
app.post('/presentacion', (req, res) => {
    const { nombre, apellido, edad, color, fechaNac, terminos } = req.body;

    try {
        // Llamar a la función de action.js para verificar las credenciales
        const credencialesValidas = ingresarPresentacion (nombre, apellido, edad, color, fechaNac);

        // Si las credenciales son válidas, responder con un mensaje de bienvenida
        if (credencialesValidas) {
            res.json({ message: '¡Datos cargados!' });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        // Si hubo algún error al leer la base de datos
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


    //aca vamos a agregar una llamada a la BD
    if (nombre.trim() === "") {
        res.status(401).json({ message: 'campo nombre esta vacio.' });
    }

    if (!isNaN(nombre)) {
        res.status(401).json({ message: 'campo nombre no debe tener numeros.' });
    }

    if (edad >= 18 ){
        res.json({ message: '¡Bienvenido!' });
    } else{
        res.status(401).json({ message: 'Debes ser mayor de 18 años.' });
    }
    ;


app.get('/nuevo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'nuevo.html'));
});

//iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
