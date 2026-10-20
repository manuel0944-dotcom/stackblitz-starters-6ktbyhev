const fs = require('node:fs');
const path = require('node:path');

const archivoTareas = path.join(__dirname, '..', 'data', 'tareas.json');
let tareas = require('../data/tareas.json');
const { integrantes } = require('./integrantes.controller');

const ESTADOS_VALIDOS = ['pendiente', 'en progreso', 'hecha'];

const guardarTareas = () => {
  fs.writeFileSync(archivoTareas, `${JSON.stringify(tareas, null, 2)}\n`, 'utf8');
};

const esFechaValida = (valor) => {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }

  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().slice(0, 10) === valor;
};

const obtenerTareas = (req, res) => {
  let resultado = [...tareas];
  const { estado, responsableId } = req.query;

  if (estado !== undefined) {
    if (!ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({
        error: `Estado no válido. Usa: ${ESTADOS_VALIDOS.join(', ')}.`
      });
    }
    resultado = resultado.filter((tarea) => tarea.estado === estado);
  }

  if (responsableId !== undefined) {
    const idResponsable = Number(responsableId);
    if (!Number.isInteger(idResponsable) || idResponsable < 1) {
      return res.status(400).json({ error: 'responsableId debe ser un número entero positivo.' });
    }
    resultado = resultado.filter((tarea) => Number(tarea.responsableId) === idResponsable);
  }

  return res.status(200).json(resultado);
};

const obtenerTareaPorId = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El ID debe ser un número entero positivo.' });
  }

  const tarea = tareas.find((item) => Number(item.id) === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  return res.status(200).json(tarea);
};

const validarDatosTarea = (datos, { parcial = false } = {}) => {
  const errores = [];

  if (!parcial || datos.titulo !== undefined) {
    if (typeof datos.titulo !== 'string' || !datos.titulo.trim()) {
      errores.push('El título es obligatorio y debe ser texto.');
    }
  }

  if (datos.descripcion !== undefined && typeof datos.descripcion !== 'string') {
    errores.push('La descripción debe ser texto.');
  }

  if (!parcial || datos.responsableId !== undefined) {
    const responsableId = Number(datos.responsableId);
    if (!Number.isInteger(responsableId) || responsableId < 1) {
      errores.push('responsableId debe ser un número entero positivo.');
    } else if (!integrantes.some((integrante) => Number(integrante.id) === responsableId)) {
      errores.push('El responsable asignado no existe en la lista de integrantes.');
    }
  }

  if (datos.estado !== undefined && !ESTADOS_VALIDOS.includes(datos.estado)) {
    errores.push(`El estado debe ser uno de estos: ${ESTADOS_VALIDOS.join(', ')}.`);
  }

  if (datos.fechaLimite !== undefined && datos.fechaLimite !== '' && !esFechaValida(datos.fechaLimite)) {
    errores.push('fechaLimite debe tener formato YYYY-MM-DD y ser una fecha válida.');
  }

  return errores;
};

const crearTarea = (req, res) => {
  const datos = req.body || {};
  const errores = validarDatosTarea(datos);

  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos de tarea no válidos.', detalles: errores });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map((tarea) => Number(tarea.id))) + 1 : 1,
    titulo: datos.titulo.trim(),
    descripcion: typeof datos.descripcion === 'string' ? datos.descripcion.trim() : '',
    responsableId: Number(datos.responsableId),
    estado: datos.estado || 'pendiente',
    fechaLimite: datos.fechaLimite || ''
  };

  tareas.push(nuevaTarea);

  try {
    guardarTareas();
  } catch (error) {
    tareas.pop();
    console.error('Error al guardar tareas:', error);
    return res.status(500).json({ error: 'No fue posible guardar la tarea.' });
  }

  return res.status(201).json({
    mensaje: 'Tarea creada exitosamente.',
    tarea: nuevaTarea
  });
};

const actualizarTarea = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El ID debe ser un número entero positivo.' });
  }

  const indice = tareas.findIndex((tarea) => Number(tarea.id) === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  const datos = req.body || {};
  const camposPermitidos = ['titulo', 'descripcion', 'responsableId', 'estado', 'fechaLimite'];
  const camposRecibidos = Object.keys(datos);

  if (camposRecibidos.length === 0) {
    return res.status(400).json({ error: 'Debes enviar al menos un campo para actualizar.' });
  }

  const campoDesconocido = camposRecibidos.find((campo) => !camposPermitidos.includes(campo));
  if (campoDesconocido) {
    return res.status(400).json({ error: `El campo "${campoDesconocido}" no se puede modificar.` });
  }

  const errores = validarDatosTarea(datos, { parcial: true });
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos de tarea no válidos.', detalles: errores });
  }

  const tareaAnterior = { ...tareas[indice] };
  const cambios = { ...datos };

  if (cambios.titulo !== undefined) cambios.titulo = cambios.titulo.trim();
  if (cambios.descripcion !== undefined) cambios.descripcion = cambios.descripcion.trim();
  if (cambios.responsableId !== undefined) cambios.responsableId = Number(cambios.responsableId);
  if (cambios.fechaLimite === '') cambios.fechaLimite = '';

  tareas[indice] = { ...tareas[indice], ...cambios };

  try {
    guardarTareas();
  } catch (error) {
    tareas[indice] = tareaAnterior;
    console.error('Error al actualizar tarea:', error);
    return res.status(500).json({ error: 'No fue posible guardar los cambios de la tarea.' });
  }

  return res.status(200).json({
    mensaje: 'Tarea actualizada exitosamente.',
    tarea: tareas[indice]
  });
};

const eliminarTarea = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El ID debe ser un número entero positivo.' });
  }

  const indice = tareas.findIndex((tarea) => Number(tarea.id) === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  const [tareaEliminada] = tareas.splice(indice, 1);

  try {
    guardarTareas();
  } catch (error) {
    tareas.splice(indice, 0, tareaEliminada);
    console.error('Error al eliminar tarea:', error);
    return res.status(500).json({ error: 'No fue posible eliminar la tarea.' });
  }

  return res.status(200).json({
    mensaje: 'Tarea eliminada exitosamente.',
    tarea: tareaEliminada
  });
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};
