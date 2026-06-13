# Sistema de Gestión de Actividades

**CC5002 - Tarea 3**  
**Autor:** Benjamin Alcaino  
**Fecha de Entrega:** 12/06/2026

## Descripción del Proyecto

Aplicación web desarrollada con Flask para gestionar miembros y actividades de la comunidad. Permite registrar miembros, crear actividades, listar actividades con filtros y paginación, visualizar detalles específicos de cada actividad, agregar comentarios y consultar estadísticas.

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
│   │   ├── listado.js         # Filtrado, ordenamiento y paginación
│   │   ├── comentarios.js     # Carga y envio de comentarios
│   │   └── estadisticas.js    # Generación de gráficos con Highcharts
│   ├── imagenes/              # Imágenes estáticas del proyecto
│   └── uploads/               # Archivos subidos por usuarios (ignorada en Git)
│
└── templates/                  # Plantillas HTML de Flask
    ├── index.html             # Página principal con indicadores
    ├── miembros.html          # Formulario de registro de miembros
    ├── actividades.html       # Formulario de registro de actividades
    ├── listado.html           # Listado de actividades
    └── detalle.html           # Detalle de una actividad específica
    └── estadisticas.html      # Página de gráficos y estadísticas

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

### Comentarios

- Cada actividad puede recibir comentarios.
- Los usuarios pueden agregar nuevos comentarios sin recargar la página.
- Los comentarios quedan almacenados en la base de datos.

### Estadísticas

**Visualización de gráficos** generados con Highcharts:

- Miembros registrados por día.
- Actividades agrupadas por tipo.
- Actividades agrupadas por comuna.

### Página de Inicio

- Mensaje de bienvenida
- Navegación principal a las diferentes secciones
- Visualización de las últimas actividades registradas.

## Base de Datos

**Credenciales:** La aplicación utiliza MySQL con las siguientes credenciales:

- **Usuario:** `cc5002`
- **Contraseña:** `programacionweb`
- **Host:** `localhost`
- **Puerto:** `3306`
- **Base de datos:** `tarea2`

Scripts SQL ejecutados:

- `tarea2.sql` - Esquema principal
- `region-comuna.sql` - Datos de regiones y comunas
- `tabla-comentario.sql`- Tabla con comentarios de las actividades

## Tecnologia utilizada

- **Backend:** Flask para manejo de rutas y base de datos, SQLAlchemy, MySQL
- **Frontend:** HTML5, CSS3 y JavaScript vanilla
- **Almacenamiento de archivos:** Carpeta `static/uploads/` para archivos subidos por usuarios
- **Externo**: Highcharts para visualización de datos.
- **Archivos ignorados en Git:** Entorno virtual, caché de Python, uploads, archivos `.db`, `.env`

## Uso de la aplicación

1. **Página de inicio:** Accede a `index.html` (página principal)
2. **Navegación:** Usa la barra de navegación para acceder a:
   - Registro de Miembros
   - Registro de Actividades
   - Listado de Actividades
   - Estadiísticas
3. **Registrar información:** Completa los formularios con validaciones en tiempo real
4. **Ver detalles:** Haz clic en una actividad del listado para ver su información completa
5. **Añadir comentarios**: Haz clic en una actividad del listado para añadir comentarios
6. **Consultar estadistícas**: 
5. **Volver:** Usa los botones de navegación para volver a secciones anteriores

## Cambios realizados con respecto a la versión anterior

1. Nuevos archivos:

   JS:
   - comentarios.js
   - estadisticas.js
   - highcharts.js

   HTML:
   - estadisticas.html

2. Modificaciones importantes:
   
   HTML:
   - index.html: Ya no muestra imagenes estaticas
   - detalle.html: Incorporar comentarios

   py:
   - models.py: Incorporar tabla de comentarios
   - app.py: Incorporar nuevas rutas asincronicas

3. Sistema de comentarios
- Incorporación de la entidad Comentario.
- Relación "uno a muchos" entre Actividad y Comentario.
- Visualización y creación de comentarios.

4. Nuevas rutas para comunicación asíncrona:

- /api/comentarios/<id>
- /api/miembros-dia
- /api/actividades-tipo
- /api/actividades-comuna

5. Estadísticas
- Eliminación de imágenes estáticas.
- Incorporación de gráficos utilizando Highcharts.
- Obtención de datos desde la base de datos

6. Uso de Fetch
- Carga dinámica de comentarios.
- Obtención dinámica de información estadística.
- Actualización parcial de contenido sin recargar páginas.
