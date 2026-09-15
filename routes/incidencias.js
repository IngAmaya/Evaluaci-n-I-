// Importamos el marco de trabajo Express para manejar el enrutamiento
const express = require('express');

// Creamos una instancia de Router para gestionar las rutas de manera modular (Patrón MVC)
const router = express.Router();

// Importamos las funciones controladoras desde nuestro archivo de controladores
// Cada función contiene la lógica de negocio para responder a las diferentes peticiones HTTP
const { 
    obtenerIncidencias, 
    crearIncidencia, 
    obtenerIncidenciaPorId 
} = require('../controllers/incidenciasController');

// 1. Ruta para obtener el listado completo de incidencias (Endpoint 2)
// Método: GET -> Devuelve un JSON con todas las incidencias registradas
router.get('/', obtenerIncidencias);

// 2. Ruta para registrar una nueva incidencia (Endpoint 1)
// Método: POST -> Recibe datos en el body de la petición, valida y guarda la nueva incidencia
router.post('/', crearIncidencia);

// 3. Ruta para buscar una incidencia específica por su ID (Endpoint 3)
// Método: GET -> Utiliza un parámetro de ruta (:id) para localizar y retornar un elemento individual
router.get('/:id', obtenerIncidenciaPorId);


// Exportamos el enrutador configurado para que pueda ser utilizado en app.js
module.exports = router;