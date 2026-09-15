// Arreglo en memoria para almacenar las incidencias
const incidencias = [];
let contadorId = 1;

// Prioridades válidas exigidas
const prioridadesValidas = ['Baja', 'Media', 'Alta', 'Crítica'];

// 1. Registrar una nueva incidencia (POST)
const crearIncidencia = (req, res) => {
    const { titulo, descripcion, prioridad, usuario } = req.body;

    // Validación de campos obligatorios y que no sean cadenas vacías
    if (!titulo || !descripcion || !prioridad || !usuario ||
        titulo.trim() === '' || descripcion.trim() === '' || 
        prioridad.trim() === '' || usuario.trim() === '') {
        return res.status(400).json({ 
            error: "Todos los campos (titulo, descripcion, prioridad, usuario) son obligatorios y no deben estar vacíos." 
        });
    }

    // Validación de prioridad permitida
    if (!prioridadesValidas.includes(prioridad)) {
        return res.status(400).json({ 
            error: `La prioridad ingresada no es válida. Valores permitidos: ${prioridadesValidas.join(', ')}` 
        });
    }

    // Crear el objeto de la incidencia
    const nuevaIncidencia = {
        id: contadorId++,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        usuario: usuario.trim(),
        estado: 'Pendiente', // Estado inicial por defecto
        fechaCreacion: new Date()
    };

    incidencias.push(nuevaIncidencia);

    return res.status(201).json({
        mensaje: "Incidencia registrada exitosamente",
        incidencia: nuevaIncidencia
    });
};

// 2. Obtener todas las incidencias (GET)
const obtenerIncidencias = (req, res) => {
    return res.status(200).json(incidencias);
};

// 3. Obtener una incidencia por ID (GET /:id)
const obtenerIncidenciaPorId = (req, res) => {
    const idParam = parseInt(req.params.id);

    // Buscar usando el método de arreglos find()
    const incidenciaEncontrada = incidencias.find(inc => inc.id === idParam);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ error: `No se encontró ninguna incidencia con el ID ${idParam}` });
    }

    return res.status(200).json(incidenciaEncontrada);
};

module.exports = {
    incidencias, // Se exporta por si tu compañero la necesita en sus controladores
    crearIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId
};