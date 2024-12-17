const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { ingresarPresentacion } = require('./action');

app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

//ruta para servir el archivo logueo.html
app.get('/inicio', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html')); // Servir 'logueo.html' desde la carpeta 'public'
}); 

// manejar la solicitud POST para /presentacion
app.post('/presentacion', (req, res) => {
    const { nombre, apellido, edad, color, fechaNac, terminos } = req.body;

    try {
        // Llamar a la función de action.js para verificar las credenciales
        const credencialesValidas = ingresarPresentacion (nombre, apellido, edad, color, fechaNac);

        // Validaciones adicionales
        if (nombre.trim() === "") {
            return res.status(401).json({ message: 'Campo nombre está vacío.' });
        }

        if (!isNaN(nombre)) {
            return res.status(401).json({ message: 'Campo nombre no debe tener números.' });
        }

        if (edad < 18) {
            return res.status(401).json({ message: 'Debes ser mayor de 18 años.' });
        }

        // Si las credenciales son válidas
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

// ruta para el archivo 'nuevo.html'
app.get('/nuevo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'nuevo.html'));
});

// iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});