# Evidencias de Pruebas de la API: Gestor de Tareas en Equipo

**Proyecto:** Gestor de tareas en equipo (Caso 1)  
**Asignatura:** Programación Aplicada

Este documento contiene casos de prueba para ejecutar en StackBlitz, VS Code, Postman o una herramienta similar. Los resultados descritos como esperados deben reemplazarse o complementarse con las evidencias reales después de ejecutar cada prueba.

## 1. Inicio del servicio

### Prueba 1.1: Verificar que la API inicia

- **Comando:** `npm start`
- **Resultado esperado:** aparece un mensaje indicando que el servidor está activo.
- **Verificación:** abrir `http://localhost:3000/health`.
- **Respuesta esperada:** `200 OK` y `{"estado":"ok"}`.

## 2. Módulo de integrantes (`/integrantes`)

### Prueba 2.1: Consultar integrantes

- **Método:** `GET`
- **Ruta:** `/integrantes`
- **Resultado esperado:** `200 OK` y un arreglo JSON de integrantes.

### Prueba 2.2: Crear integrante válido

- **Método:** `POST`
- **Ruta:** `/integrantes`
- **Header:** `Content-Type: application/json`
- **Cuerpo:**

```json
{
  "nombre": "Lucía Pérez",
  "correo": "lucia.perez@ejemplo.com"
}
```

- **Resultado esperado:** `201 Created` con el nuevo integrante.

### Prueba 2.3: Rechazar integrante sin correo

- **Método:** `POST`
- **Ruta:** `/integrantes`
- **Cuerpo:** `{"nombre":"Lucía Pérez"}`
- **Resultado esperado:** `400 Bad Request`.

### Prueba 2.4: Rechazar correo duplicado

- **Método:** `POST`
- **Ruta:** `/integrantes`
- **Resultado esperado:** `409 Conflict` si el correo ya existe.

## 3. Módulo de tareas (`/tareas`)

### Prueba 3.1: Listar tareas

- **Método:** `GET`
- **Ruta:** `/tareas`
- **Resultado esperado:** `200 OK` y un arreglo JSON.

### Prueba 3.2: Filtrar por estado

- **Método:** `GET`
- **Ruta:** `/tareas?estado=en progreso`
- **Resultado esperado:** `200 OK`; todas las tareas devueltas tienen estado `en progreso`.

### Prueba 3.3: Filtrar por responsable

- **Método:** `GET`
- **Ruta:** `/tareas?responsableId=1`
- **Resultado esperado:** `200 OK`; las tareas devueltas tienen `responsableId` igual a `1`.

### Prueba 3.4: Consultar tarea existente

- **Método:** `GET`
- **Ruta:** `/tareas/1`
- **Resultado esperado:** `200 OK` con la tarea de ID 1.

### Prueba 3.5: Consultar ID inexistente

- **Método:** `GET`
- **Ruta:** `/tareas/9999`
- **Resultado esperado:** `404 Not Found`.

### Prueba 3.6: Crear tarea válida

- **Método:** `POST`
- **Ruta:** `/tareas`
- **Header:** `Content-Type: application/json`
- **Cuerpo:**

```json
{
  "titulo": "Preparar presentación",
  "descripcion": "Organizar las diapositivas",
  "responsableId": 1,
  "estado": "pendiente",
  "fechaLimite": "2026-11-05"
}
```

- **Resultado esperado:** `201 Created` y una tarea con un ID nuevo.

### Prueba 3.7: Rechazar responsable inexistente

- **Método:** `POST`
- **Ruta:** `/tareas`
- **Cuerpo:** `{"titulo":"Tarea inválida","responsableId":9999}`
- **Resultado esperado:** `400 Bad Request`.

### Prueba 3.8: Actualizar estado

- **Método:** `PUT`
- **Ruta:** `/tareas/1`
- **Cuerpo:** `{"estado":"en progreso"}`
- **Resultado esperado:** `200 OK` y la tarea actualizada.

### Prueba 3.9: Rechazar estado inválido

- **Método:** `PUT`
- **Ruta:** `/tareas/1`
- **Cuerpo:** `{"estado":"terminada"}`
- **Resultado esperado:** `400 Bad Request`.

### Prueba 3.10: Eliminar tarea

- **Método:** `DELETE`
- **Ruta:** `/tareas/1`
- **Resultado esperado:** `200 OK`; un GET posterior a `/tareas/1` debe devolver `404 Not Found`.

## 4. Registro de evidencias

Completa esta tabla después de ejecutar las pruebas:

| Prueba | Resultado real | Evidencia (captura o nota) |
|---|---|---|
| 1.1 Inicio y salud | Pendiente de ejecutar | |
| 2.1 Listar integrantes | Pendiente de ejecutar | |
| 2.2 Crear integrante | Pendiente de ejecutar | |
| 3.1 Listar tareas | Pendiente de ejecutar | |
| 3.2 Filtro por estado | Pendiente de ejecutar | |
| 3.6 Crear tarea | Pendiente de ejecutar | |
| 3.8 Actualizar estado | Pendiente de ejecutar | |
| 3.10 Eliminar tarea | Pendiente de ejecutar | |
