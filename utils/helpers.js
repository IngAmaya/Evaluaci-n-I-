
// Validar que un texto no sea undefined, nulo, ni esté compuesto solo por espacios
const esTextoVacio = (texto) => {
    return !texto || typeof texto !== 'string' || texto.trim() === '';
};

// Generador estándar de respuestas JSON de error HTTP
const respuestaError = (res, codigoStatus, mensaje) => {
    return res.status(codigoStatus).json({ error: mensaje });
};

module.exports = {
    esTextoVacio,
    respuestaError
};