# Gestor de Tareas en Equipo

**Asignatura:** Programación Aplicada  
**Proyecto:** Gestor de tareas en equipo (Caso 1)

## Descripción

API REST para registrar integrantes y administrar tareas de un equipo. Está construida con Node.js y Express y recibe y devuelve información JSON.

## Integrantes del equipo

- Estudiante 1: Manuel
- Estudiante 2: Changwi
- Estudiante 3: Porre

Revisa que los nombres estén escritos tal como los solicita el docente.

## Funcionalidades

- Registrar y consultar integrantes.
- Crear, listar, consultar, actualizar y eliminar tareas.
- Asignar tareas a integrantes existentes.
- Cambiar el estado a `pendiente`, `en progreso` o `hecha`.
- Filtrar tareas por estado y responsable.
- Validar campos obligatorios, correos, estados y responsables.

## Requisitos previos

- Node.js 20 o superior.
- npm.
- Git para trabajar con GitHub.

## Ejecutar en StackBlitz o VS Code

1. Abre la carpeta raíz del proyecto, donde está `package.json`.
2. En la terminal ejecuta:

   ```bash
   npm install
   npm start
   ```

3. Si aparece el mensaje de que el servidor está activo, abre `http://localhost:3000/`.
4. Para comprobar la API, abre `http://localhost:3000/health`.
5. Para detener el servidor, presiona `Ctrl + C` en la terminal.

En StackBlitz, usa la opción de ejecutar el proyecto o abrir el puerto/preview si el entorno lo solicita.

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/health` | Estado del servicio |
| GET | `/integrantes` | Listar integrantes |
| POST | `/integrantes` | Crear integrante |
| GET | `/tareas` | Listar tareas |
| GET | `/tareas/:id` | Consultar tarea por ID |
| POST | `/tareas` | Crear tarea |
| PUT | `/tareas/:id` | Actualizar tarea |
| DELETE | `/tareas/:id` | Eliminar tarea |

Filtros disponibles:
- `/tareas?estado=pendiente`
- `/tareas?estado=en%20progreso`
- `/tareas?responsableId=1`

## Ejemplo para crear una tarea

Envía una petición `POST` a `/tareas` con el encabezado `Content-Type: application/json` y este cuerpo:

```json
{
  "titulo": "Preparar presentación",
  "descripcion": "Organizar las diapositivas",
  "responsableId": 1,
  "estado": "pendiente",
  "fechaLimite": "2026-11-05"
}
```

El `responsableId` debe corresponder a un integrante existente.

## Publicar en GitHub

Desde la terminal ubicada en la carpeta raíz:

```bash
git status
git add .
git commit -m "Corrige API del gestor de tareas"
git push
```

Si todavía no existe un repositorio Git o no se ha conectado el remoto, crea el repositorio en GitHub y sigue las instrucciones que GitHub muestra para un proyecto existente. No subas `.env` ni credenciales.

## Desplegar en Render

1. Sube el proyecto a GitHub.
2. En Render, crea un **New Web Service** y conecta el repositorio.
3. Usa estos valores:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
4. Despliega y espera a que el servicio indique que está disponible.
5. Abre la URL asignada por Render, seguida de `/health`, por ejemplo `https://TU-SERVICIO.onrender.com/health`.
6. Prueba también `/integrantes` y `/tareas`.

El archivo `render.yaml` incluye una configuración inicial si eliges un flujo de despliegue que use Blueprint.

## Enlaces del proyecto

- **Repositorio GitHub:** agrega aquí la URL real del repositorio.
- **API en Render:** agrega aquí la URL real del servicio publicado.

No dejes enlaces de ejemplo cuando entregues el proyecto.

## Almacenamiento: limitación importante

Esta versión usa archivos JSON locales. En Render, los cambios de archivos pueden perderse cuando el servicio se reinicia, se vuelve a desplegar o cambia de instancia, a menos que se configure almacenamiento persistente. Para datos importantes o una aplicación en producción, migra los datos a una base de datos persistente, como PostgreSQL.

## Documentación complementaria

- `requisitos.md`: requisitos funcionales y no funcionales.
- `diseño.md`: modelo de datos y endpoints.
- `pruebas.md`: casos de prueba y registro de evidencias.
