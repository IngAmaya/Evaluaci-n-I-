const express = require('express');
const router = express.Router();


const { 
    obtenerIncidencias, 
    crearIncidencia, 
    obtenerIncidenciaPorId 
} = require('../controllers/incidenciasController');

router.get('/', obtenerIncidencias);
router.post('/', crearIncidencia);
router.get('/:id', obtenerIncidenciaPorId);


router.get('/', (req, res) => {
    res.json({ mensaje: "Ruta de incidencias funcionando" });
});

module.exports = router;