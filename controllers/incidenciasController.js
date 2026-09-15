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

// Cambiar el estado de una incidencia 
const cambiarEstado = (req, res) => {
    const idParam = parseInt(req.params.id);
    const { estado } = req.body;

    // Validación de entrada para el estado
    if (!estado || typeof estado !== 'string' || estado.trim() === '') {
        return res.status(400).json({ error: "El campo 'estado' es obligatorio." });
    }

    // Buscar incidencia por ID usando find()
    const incidenciaEncontrada = incidencias.find(inc => inc.id === idParam);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ error: `No se encontró la incidencia con el ID ${idParam}` });
    }

    const estadoLimpio = estado.trim().toLowerCase();
    let nuevoEstado = '';

    // REQUISITO OBLIGATORIO: Uso de switch para validar y asignar los estados permitidos
    switch (estadoLimpio) {
        case 'pendiente':
            nuevoEstado = 'Pendiente';
            break;
        case 'en proceso':
            nuevoEstado = 'En Proceso';
            break;
        case 'resuelta':
            nuevoEstado = 'Resuelta';
            break;
        case 'cancelada':
            nuevoEstado = 'Cancelada';
            break;
        default:
            return res.status(400).json({ 
                error: "Estado no válido. Los estados permitidos son: 'Pendiente', 'En Proceso', 'Resuelta', 'Cancelada'." 
            });
    }

    // Asignar el nuevo estado
    incidenciaEncontrada.estado = nuevoEstado;

    return res.status(200).json({
        mensaje: "Estado de la incidencia actualizado exitosamente",
        incidencia: incidenciaEncontrada
    });
};

module.exports = {
    incidencias, // Se exporta por si tu compañero la necesita en sus controladores
    crearIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId
};