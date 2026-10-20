const express = require('express');
const cors = require('cors');

const integrantesRoutes = require('./routes/integrantes.routes');
const tareasRoutes = require('./routes/tareas.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API del Gestor de Tareas en Equipo activa.',
    endpoints: {
      salud: '/health',
      integrantes: '/integrantes',
      tareas: '/tareas'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ estado: 'ok' });
});

app.use('/integrantes', integrantesRoutes);
app.use('/tareas', tareasRoutes);

// JSON mal formado enviado por el cliente.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'El cuerpo de la solicitud contiene JSON no válido.'
    });
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor.' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

module.exports = app;
