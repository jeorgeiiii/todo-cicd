# ToDoList App - DevOps Demo

Este proyecto es una **aplicación web de gestión de tareas (to-do list)** con un flujo completo de **DevOps**:

* Control de versiones con Git/GitHub
* Integración continua (CI) con GitHub Actions
* Entrega continua (CD) local con Docker Compose
* Pruebas automatizadas con Jest + Supertest
* Contenerización con Docker
* Monitoreo con Prometheus y Grafana

---

## 📦 Estructura del proyecto

```
todolist-app/
├── app.js                 # aplicación principal (Express + métricas)
├── package.json           # dependencias y scripts
├── Dockerfile             # para contenerizar la app
├── docker-compose.yml     # despliegue local con app + Prometheus + Grafana
├── prometheus.yml         # configuración Prometheus
├── grafana-dashboard.json # dashboard listo para importar en Grafana
├── .gitignore
├── README.md
├── tests/
│   └── app.test.js        # pruebas automatizadas
└── .github/workflows/
    └── ci.yml             # pipeline CI
```

---

## ⚙️ Requisitos

* Node.js >= 18
* Docker Desktop (Windows/macOS) o Docker Engine (Linux)
* Git
* Navegador web para Grafana y Prometheus

---

## 🚀 Ejecutar la aplicación localmente

1. Instalar dependencias:

```bash
npm ci
```

2. Correr pruebas:

```bash
npm test
```

3. Ejecutar la app sin Docker:

```bash
npm start
```

Endpoints disponibles:

* `GET /tasks` → lista todas las tareas
* `POST /tasks` → crea una tarea, ejemplo: `{ "title": "Comprar leche" }`
* `DELETE /tasks/:id` → elimina una tarea por ID
* `GET /metrics` → métricas para Prometheus

---

## 🐳 Ejecutar con Docker Compose (CD local + Monitoreo)

Levanta la app, Prometheus y Grafana juntos:

```bash
docker-compose up --build
```

Servicios disponibles:

* App → `http://localhost:3000/tasks`
* Prometheus → `http://localhost:9090`
* Grafana → `http://localhost:3001`
  Usuario: `admin`, Contraseña: `admin`

### Importar dashboard en Grafana

1. Abrir Grafana (`http://localhost:3001`)
2. Menú lateral → Dashboards → Import
3. Subir `grafana-dashboard.json`
4. Seleccionar la data source Prometheus
5. ¡Listo! Ahora verás métricas en tiempo real:

* Total de requests (`todolist_http_requests_total`)
* Latencia promedio (`todolist_http_request_duration_seconds`)
* Requests por segundo (RPS)

---

## 🧪 Pruebas

Se usan **Jest** y **Supertest** para validar:

* Creación de tareas
* Listado de tareas
* Eliminación de tareas
* Endpoint de métricas `/metrics`

Ejecutar pruebas:

```bash
npm test
```

---

## 🔧 Detener contenedores Docker

```bash
docker-compose down
```

Esto detiene y elimina todos los contenedores levantados por `docker-compose`.

---

## ✅ Conclusión

Este proyecto demuestra un flujo completo **DevOps**:

* CI/CD automatizado con GitHub Actions
* Contenerización con Docker
* Entrega continua en entorno local con Docker Compose
* Monitoreo con Prometheus y Grafana
* Pruebas automatizadas garantizando calidad del código

Perfecto para **pruebas, demostraciones y prácticas educativas**.
