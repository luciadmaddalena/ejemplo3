const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta completa a la base de datos SQLite
const dbPath = 'C:\\desarrollo\\ejemplo3\\BD\\presentacion.bd';  // Ruta absoluta a la base de datos SQLite

function crearTabla() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ' + err.message);
            return;
        }
    });

    const query = `
        CREATE TABLE IF NOT EXISTS presentacion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            edad INTEGER NOT NULL,
            color TEXT,
            fechaNac TEXT
        );
    `;

    db.run(query, (err) => {
        if (err) {
            console.error('Error al crear la tabla: ' + err.message);
        } else {
            console.log('Tabla "presentacion" creada exitosamente.');
        }
        db.close();
    });
}

crearTabla();  // Llamada a la función para crear la tabla

function ingresarPresentacion(nombre, apellido, edad, color, fechaNac) {
    return new Promise((resolve, reject) => {
        // Conectar a la base de datos SQLite
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return reject('Error al conectar a la base de datos: ' + err.message);
            }
        });

        // Crear la consulta SQL de inserción
        const query = 'INSERT INTO presentacion (nombre, apellido, edad, color, fechaNac) VALUES (?, ?, ?, ?, ?)';

        // Ejecutar la consulta
        db.run(query, [nombre, apellido, edad, color, fechaNac], function (err) {
            if (err) {
                db.close();  // Aseguramos cerrar la base de datos en caso de error
                return reject('Error al insertar en la base de datos: ' + err.message);
            }

            // Si se insertó correctamente, devolvemos true
            resolve(true);

            // Cerrar la base de datos después de la operación
            db.close();
        });
    });
}

module.exports = { ingresarPresentacion };
