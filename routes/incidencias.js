// Importamos Express y creamos la instancia del Router para la gestión modular de rutas (Patrón MVC)
const express = require('express');
const router = express.Router();

// Importamos los controladores desde la capa correspondiente
const { 
    obtenerIncidencias, 
    crearIncidencia, 
    obtenerIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
} = require('../controllers/incidenciasController');

// --- Endpoints Generales (Rutas fijas y de creación) ---
// Obtener el listado completo de incidencias registradas
router.get('/', obtenerIncidencias);

// Registrar una nueva incidencia mediante el body de la petición
router.post('/', crearIncidencia);

// Obtener estadísticas globales (Se coloca ANTES de :id para evitar conflictos de parámetros)
router.get('/estadisticas', obtenerEstadisticas);

// Endpoints con Parámetros de Ruta (:id) 
// Consultar una incidencia específica por su ID
router.get('/:id', obtenerIncidenciaPorId);

// Actualizar el estado de una incidencia puntual
router.put('/:id/estado', cambiarEstado);

// Eliminar un registro de incidencia por su ID
router.delete('/:id', eliminarIncidencia);

// Obtener la clasificación calculada de una incidencia
router.get('/:id/clasificacion', obtenerClasificacion);

// Exportamos el enrutador para ser registrado en app.js
module.exports = router;