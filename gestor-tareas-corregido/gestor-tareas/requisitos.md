# Análisis de Requisitos: Gestor de Tareas en Equipo

## Descripción del proyecto

El Gestor de Tareas en Equipo es una API REST desarrollada con Node.js y Express. Permite registrar integrantes, crear y administrar tareas, asignar responsables, cambiar estados y consultar tareas mediante filtros. La API intercambia información en formato JSON.

## Actores del sistema

- **Usuario del sistema:** persona que utiliza la API para administrar tareas e integrantes.
- **Integrante del equipo:** persona registrada que puede ser asignada como responsable de una tarea.

## Requisitos funcionales

- **RF1. Crear tareas:** registrar tareas con título, descripción, responsable, estado y fecha límite.
- **RF2. Listar tareas:** consultar todas las tareas registradas.
- **RF3. Consultar tareas individuales:** consultar una tarea mediante su identificador.
- **RF4. Editar tareas:** modificar los datos de una tarea existente.
- **RF5. Eliminar tareas:** eliminar una tarea existente.
- **RF6. Registrar integrantes:** registrar integrantes con nombre y correo electrónico.
- **RF7. Consultar integrantes:** consultar los integrantes registrados.
- **RF8. Asignar responsables:** asignar una tarea a un integrante existente.
- **RF9. Actualizar estados:** usar los estados `pendiente`, `en progreso` y `hecha`.
- **RF10. Filtrar por estado:** consultar tareas según su estado.
- **RF11. Filtrar por responsable:** consultar tareas según el ID del responsable.
- **RF12. Validar información:** comprobar campos obligatorios, formatos y existencia del responsable.

## Requisitos no funcionales

- **RNF1. Intercambio de información:** la API recibe y responde en JSON.
- **RNF2. Validación:** validar los datos antes de crear o actualizar registros.
- **RNF3. Usabilidad:** devolver mensajes claros y códigos HTTP adecuados.
- **RNF4. Mantenibilidad:** separar rutas, controladores y datos.
- **RNF5. Compatibilidad:** ejecutar con Node.js 20 o superior.
- **RNF6. Configuración de despliegue:** escuchar el puerto asignado mediante la variable de entorno `PORT`.

## Alcance y limitaciones

Esta versión usa archivos JSON locales como almacenamiento sencillo. En un despliegue estándar de Render, el sistema de archivos puede ser efímero: los datos modificados pueden perderse al reiniciar o desplegar de nuevo. Para conservar datos de forma fiable, se recomienda usar una base de datos persistente, por ejemplo PostgreSQL.
