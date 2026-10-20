const app = require('./src/app');

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor del Gestor de Tareas activo en el puerto ${PORT}`);
  console.log(`Prueba local: http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('No fue posible iniciar el servidor:', error.message);
  process.exit(1);
});
