const express = require('express');
const app = express();
const PORT = 3124;

// Importar rutas de incidencias
const incidenciasRoutes = require('./routes/incidencias');

// Middleware para leer JSON
app.use(express.json());

// Arreglo en memoria global para las incidencias
const incidencias = [];

// Usar las rutas
app.use('/incidencias', incidenciasRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: "API REST de Soporte Técnico UCA funcionando correctamente" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});