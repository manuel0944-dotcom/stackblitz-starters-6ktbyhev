# Diseño del Sistema: Gestor de Tareas en Equipo

## Modelo de datos

### Integrante

- `id` (número, obligatorio): identificador único.
- `nombre` (texto, obligatorio): nombre del integrante.
- `correo` (texto, obligatorio): correo electrónico válido y único.

### Tarea

- `id` (número, obligatorio): identificador único.
- `titulo` (texto, obligatorio): título descriptivo.
- `descripcion` (texto, opcional): detalle de la tarea.
- `responsableId` (número, obligatorio): ID de un integrante existente.
- `estado` (texto, obligatorio): `pendiente`, `en progreso` o `hecha`.
- `fechaLimite` (fecha opcional): formato `YYYY-MM-DD`.

## Endpoints de la API

| Método | Ruta | Descripción | Respuestas habituales |
|---|---|---|---|
| GET | `/` | Mensaje de bienvenida | `200` |
| GET | `/health` | Verificación de salud para Render | `200` |
| GET | `/integrantes` | Listar integrantes | `200` |
| POST | `/integrantes` | Registrar integrante | `201`, `400`, `409` |
| GET | `/tareas` | Listar tareas | `200` |
| GET | `/tareas?estado=pendiente` | Filtrar por estado | `200`, `400` |
| GET | `/tareas?responsableId=1` | Filtrar por responsable | `200`, `400` |
| GET | `/tareas/:id` | Consultar tarea por ID | `200`, `400`, `404` |
| POST | `/tareas` | Crear tarea | `201`, `400` |
| PUT | `/tareas/:id` | Actualizar campos de una tarea | `200`, `400`, `404` |
| DELETE | `/tareas/:id` | Eliminar tarea | `200`, `400`, `404` |

## Ejemplo de cuerpo para crear una tarea

```json
{
  "titulo": "Preparar presentación",
  "descripcion": "Organizar las diapositivas del proyecto",
  "responsableId": 1,
  "estado": "pendiente",
  "fechaLimite": "2026-11-05"
}
```

## Arquitectura del proyecto

```text
gestor-tareas/
├── src/
│   ├── data/
│   │   ├── integrantes.json
│   │   └── tareas.json
│   ├── controllers/
│   │   ├── integrantes.controller.js
│   │   └── tareas.controller.js
│   ├── routes/
│   │   ├── integrantes.routes.js
│   │   └── tareas.routes.js
│   └── app.js
├── index.js
├── package.json
├── render.yaml
├── requisitos.md
├── diseño.md
├── pruebas.md
└── README.md
```

## Decisiones técnicas

- Express administra las rutas y las solicitudes HTTP.
- Los controladores contienen la lógica de validación y las operaciones CRUD.
- Los archivos JSON contienen los datos de ejemplo.
- `PORT` se obtiene de las variables de entorno para que Render pueda iniciar el servicio.
- La API ofrece `/health` como ruta de comprobación del despliegue.
