const sqlite3 = require('sqlite3').verbose();
const dbPath = 'C:\\Desarrollo\\ejemplo3\\BD\\presentacion.db';  // Ruta absoluta a la base de datos SQLite

function ingresarPresentacion(nombre, apellido, edad, color, fechaNac) {
    return new Promise((resolve, reject) => {
        // Conectar a la base de datos SQLite
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return reject('Error al conectar a la base de datos: ' + err.message);
            }
        });

        // Crear la consulta de inserción
        const query = 'INSERT INTO presentacion (nombre, apellido, edad, color, fechaNac) VALUES (?, ?, ?, ?, ?)';

        // Ejecutar la consulta
        db.run(query, [nombre, apellido, edad, color, fechaNac], function(err) {
            if (err) {
                db.close();
                return reject('Error al insertar en la base de datos: ' + err.message);
            }

            // Si la inserción es exitosa, devolver el ID generado (this.lastID)
            console.log('Registro insertado con ID:', this.lastID);  // Opcional: mostrar el ID insertado
            resolve(true);

            // Cerrar la base de datos después de la operación
            db.close((closeErr) => {
                if (closeErr) {
                    console.error('Error al cerrar la base de datos:', closeErr.message);
                } else {
                    console.log('Base de datos cerrada correctamente.');
                }
            });
        });
    });
}

module.exports = { ingresarPresentacion };
