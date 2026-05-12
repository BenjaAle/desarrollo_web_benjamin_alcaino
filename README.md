# Sistema de Gestión de Actividades

**CC5002 - Tarea 1**  
**Autor:** Benjamin Alcaino  
**Fecha de Entrega:** 14/04/2026

## Descripción del Proyecto

Aplicación web desarrollada con Flask para gestionar actividades y miembros. Permite registrar miembros, crear actividades, listar actividades con filtros y paginación, y visualizar detalles específicos de cada actividad.

## Estructura de archivos

```
Tarea 01/
├── app.py                      # Aplicación Flask principal
├── models.py                   # Modelos de datos
├── requirements.txt            # Dependencias Python
├── .gitignore                  # Configuración de Git
├── README.md                   # Este archivo
│
├── db/                         # Base de datos (ignorada en Git)
│   ├── region-comuna.sql       # Script de regiones y comunas
│   └── tarea2.sql             # Script de base de datos principal
│
├── static/                     # Archivos estáticos
│   ├── css/
│   │   └── style.css          # Estilos de la aplicación
│   ├── js/
│   │   ├── actividades.js     # Validaciones de formulario de actividades
│   │   ├── miembros.js        # Validaciones de formulario de miembros
│   │   ├── region_comuna.js   # Lógica de regiones y comunas
│   │   └── listado.js         # Filtrado, ordenamiento y paginación
│   ├── imagenes/              # Imágenes estáticas del proyecto
│   └── uploads/               # Archivos subidos por usuarios (ignorada en Git)
│
└── templates/                  # Plantillas HTML de Flask
    ├── index.html             # Página principal con indicadores
    ├── miembros.html          # Formulario de registro de miembros
    ├── actividades.html       # Formulario de registro de actividades
    ├── listado.html           # Listado de actividades
    └── detalle.html           # Detalle de una actividad específica

```

## Configuración e Instalación

### Requisitos previos

- Python 3.x
- pip

### Pasos de instalación

1. **Clonar o descargar el proyecto**

2. **Crear entorno virtual**

   ```bash
   python -m venv venv
   venv\Scripts\activate  # En Windows
   ```

3. **Instalar dependencias**

   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```
   La aplicación estará disponible en `http://localhost:5000`

## Funcionalidades

### Registro de Miembros

- **Nombre:** 3-100 caracteres
- **Email:** Formato válido (`usuario@dominio.extension`)
- **Tipo de miembro:** Obligatorio (Estudiante, Académico, Funcionario)
- **Campo dinámico:** Cambia según el tipo (Carrera para estudiante, Departamento para académico, Cargo para funcionario)
- Los datos se almacenan en la base de datos

### Registro de Actividades

- **Categoría:** Obligatorio (seleccionar de la lista disponible)
- **Días de la semana:** Acepta mayúsculas, minúsculas y separadores (ej: "Lunes, Miércoles y viernEs")
- **Horas semanales:** Número mayor a 0
- **Archivo:** Acepta múltiples archivos de imágenes y video (al menos uno requerido)
- **Enlace:** Opcional
- Los datos se almacenan en la base de datos

### Listado de Actividades

- Visualización de todas las actividades registradas
- **Filtrado:** Por categoría u otros criterios
- **Ordenamiento:** Por nombre, fecha, categoría, etc.
- **Paginación:** Distribución configurable de actividades por página
- Compatible con filtros y ordenamientos

### Detalle de Actividad

- Visualización completa de información de una actividad
- Acceso mediante URL con ID de la actividad
- Opción de volver al listado

### Página de Inicio

- Indicadores y métricas del sistema
- Navegación principal a las diferentes secciones

## Base de Datos

**Credenciales:** La aplicación utiliza MySQL con las siguientes credenciales:

- **Usuario:** `cc5002`
- **Contraseña:** `programacionweb`
- **Host:** `localhost`
- **Puerto:** `3306`
- **Base de datos:** `tarea2`

Los scripts SQL necesarios se encuentran en la carpeta `db/`:

- `tarea2.sql` - Esquema principal
- `region-comuna.sql` - Datos de regiones y comunas

## Tecnologia utilizada

- **Backend:** Flask para manejo de rutas y base de datos
- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Base de datos:** MySQL
- **Almacenamiento de archivos:** Carpeta `static/uploads/` para archivos subidos por usuarios
- **Archivos ignorados en Git:** Entorno virtual, caché de Python, uploads, archivos `.db`, `.env`

## Uso de la aplicación

1. **Página de inicio:** Accede a `index.html` con estadísticas
2. **Navegación:** Usa la barra de navegación para acceder a:
   - Registro de Miembros
   - Registro de Actividades
   - Listado de Actividades
3. **Registrar información:** Completa los formularios con validaciones en tiempo real
4. **Ver detalles:** Haz clic en una actividad del listado para ver su información completa
5. **Volver:** Usa los botones de navegación para volver a secciones anteriores
