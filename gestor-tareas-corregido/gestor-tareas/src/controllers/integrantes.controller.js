const fs = require('node:fs');
const path = require('node:path');

const archivoIntegrantes = path.join(__dirname, '..', 'data', 'integrantes.json');
let integrantes = require('../data/integrantes.json');

const guardarIntegrantes = () => {
  fs.writeFileSync(archivoIntegrantes, `${JSON.stringify(integrantes, null, 2)}\n`, 'utf8');
};

const obtenerIntegrantes = (req, res) => {
  return res.status(200).json(integrantes);
};

const crearIntegrante = (req, res) => {
  const nombre = typeof req.body.nombre === 'string' ? req.body.nombre.trim() : '';
  const correo = typeof req.body.correo === 'string' ? req.body.correo.trim().toLowerCase() : '';

  if (!nombre || !correo) {
    return res.status(400).json({
      error: 'El nombre y el correo electrónico son obligatorios.'
    });
  }

  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoCorreo.test(correo)) {
    return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido.' });
  }

  const correoExiste = integrantes.some(
    (integrante) => integrante.correo.toLowerCase() === correo
  );
  if (correoExiste) {
    return res.status(409).json({ error: 'Ya existe un integrante con ese correo electrónico.' });
  }

  const nuevoIntegrante = {
    id: integrantes.length > 0
      ? Math.max(...integrantes.map((integrante) => Number(integrante.id))) + 1
      : 1,
    nombre,
    correo
  };

  integrantes.push(nuevoIntegrante);

  try {
    guardarIntegrantes();
  } catch (error) {
    integrantes.pop();
    console.error('Error al guardar integrantes:', error);
    return res.status(500).json({ error: 'No fue posible guardar el integrante.' });
  }

  return res.status(201).json({
    mensaje: 'Integrante creado exitosamente.',
    integrante: nuevoIntegrante
  });
};

module.exports = {
  obtenerIntegrantes,
  crearIntegrante,
  integrantes
};
