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

// manejar la solicitud POST para /presentaci
app.post('/presentacion', async (req, res) => {
    const { nombre, apellido, edad, color, fechaNac } = req.body;
  
    try {
      const solicitudGuardada = await ingresarPresentacion(nombre, apellido, edad, color, fechaNac);
  
      if (solicitudGuardada) {
        // Only send the response once
        return res.json({ message: 'Ok' });
      } else {
        // Only send the response once
        return res.status(401).json({ message: 'Nok' });
      }
  
    } catch (error) {
      console.error(error);
     
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error en el servidor' });
      }
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