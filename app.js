const express = require('express');
const app = express();
const PORT = 3124;

// Middleware obligatorio para que Express pueda leer datos JSON en las peticiones
app.use(express.json());

// Arreglo en memoria para almacenar las incidencias 
const incidencias = [];

// Ruta de prueba inicial para verificar que el servidor está activo
app.get('/', (req, res) => {
    res.json({ mensaje: "API REST de Soporte Técnico funcionando correctamente" });
});

// Iniciar el servidor en el puerto 3124
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});