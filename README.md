# Sistema de Gestión de Actividades

**CC5002 - Tarea 4**  
**Autor:** Benjamin Alcaino  
**Fecha de Entrega:** 30/06/2026

## Descripción del Proyecto

Aplicación web desarrollada con el framework Spring Boot de java para gestionar miembros y actividades de la comunidad. Permite registrar miembros, crear actividades, listar actividades con filtros y paginación, visualizar detalles específicos de cada actividad, agregar comentarios,consultar estadísticas, evaluar actividades con nota y realizar búsquedas dinámicas de actividades.

## Estructura de archivos

```
desarrollo_web_benjamin_alcaino
├─ .mvn
│  └─ wrapper
│     └─ maven-wrapper.properties
├─ mvnw
├─ mvnw.cmd
├─ pom.xml
├─ README.md                              # Este archivo
└─ src
   ├─ main
   │  ├─ java
   │  │  └─ cc5002
   │  │     └─ tarea4
   │  │        ├─ controllers
   │  │        │  ├─ ApiController.java       # Define rutas para retornar datos
   │  │        │  └─ AppController.java       # Define rutas para retornar vistas
   │  │        ├─ models                      # Modelos de la base de datos. Contienen constructores, getters y setters.
   │  │        │  ├─ Actividad.java
   │  │        │  ├─ Comentario.java
   │  │        │  ├─ Comuna.java
   │  │        │  ├─ Foto.java
   │  │        │  ├─ Miembro.java
   │  │        │  ├─ Nota.java
   │  │        │  └─ Region.java
   │  │        ├─ repositories                  # Extensiones de JpaRepository para operaciones CRUD
   │  │        │  ├─ ActividadRepository.java   
   │  │        │  ├─ ComentarioRepository.java  
   │  │        │  ├─ ComunaRepository.java      
   │  │        │  ├─ FotoRepository.java
   │  │        │  ├─ MiembroRepository.java
   │  │        │  ├─ NotaRepository.java
   │  │        │  └─ RegionRepository.java
   │  │        └─ Tarea4Application.java
   │  └─ resources
   │     ├─ application.properties
   │     ├─ static
   │     │  ├─ css
   │     │  │  └─ style.css                     # Estilos de la aplicación
   │     │  ├─ imagenes                         # Imágenes estáticas del proyecto
   │     │  │  └─ cadcc.png
   │     │  └─ js
   │     │     ├─ actividades.js                # Validaciones de formulario de actividades
   │     │     ├─ buscador.js                   # Logica de funcionamiento para la barra de busqueda de actividades
   │     │     ├─ comentarios.js                # Carga y envio de comentarios
   │     │     ├─ estadisticas.js               # Generación de gráficos con Highcharts
   │     │     ├─ highcharts.js                 # Codigo js que permite generar graficos dinamicos
   │     │     ├─ miembros.js                   # Validaciones de formulario de miembros
   │     │     └─ region_comuna.js              # Lógica de regiones y comunas
   │     └─ templates                        # Plantillas HTML
   │        ├─ actividades.html                 # Formulario de registro de actividades
   │        ├─ buscador.html                    # Buscador de actividades
   │        ├─ detalle.html                     # Detalle de una actividad específica
   │        ├─ estadisticas.html                # Página de gráficos y estadísticas
   │        ├─ index.html                       # Página principal con indicadores
   │        ├─ listado.html                     # Listado de actividades
   │        └─ miembros.html                    # Formulario de registro de miembros
   └─ test
      └─ java
         └─ cc5002
            └─ tarea4
               └─ Tarea4ApplicationTests.java   # Ejecutar la aplicación

```

## Configuración e Instalación

### Requisitos previos

- Java 17 o superior
- Maven
- Base de datos MySQL local

### Pasos de instalación

1. **Clonar o descargar el proyecto**

2. **Configurar la base de datos**

   ```bash
   Ejecutar scripts SQL para cargar la estructura inicial
   ```

3. **Instalar dependencias**

   ```bash
   mvn clean install
   ```

4. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```
   La aplicación estará disponible en `http://localhost:8080`

## Funcionalidades

### Página de Inicio

- Mensaje de bienvenida
- Navegación principal a las diferentes secciones
- Visualización de las últimas actividades registradas.

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
- **Descripción:** Opcional. Debe contener al menos 3 caracteres
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
- Opción de volver al listado de actividades o al inicio

### Comentarios

- Cada actividad puede recibir comentarios.
- Los usuarios pueden agregar nuevos comentarios sin recargar la página.
- Los comentarios quedan almacenados en la base de datos.

### Estadísticas

**Visualización de gráficos** generados con Highcharts:

- Miembros registrados por día.
- Actividades agrupadas por tipo.
- Actividades agrupadas por comuna.

### Buscador dinámico (Nuevo)

- Búsqueda asíncrona que se activa automáticamente al ingresar 3 o más caracteres.
- Busca coincidencias en nombre de actividad, descripción o comuna.
- Destaca visualmente el patrón buscado dentro de los resultados.
- Muestra mensaje amigable si no hay coincidencias.

### Sistema de Evaluación (Nuevo)

- Integrado en los resultados del buscador.
- Permite evaluar una actividad del 1.0 al 7.0.
- Guardado asíncrono en la base de datos.
- Refleja inmediatamente la nota asignada sin recargar la página.

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

- **Backend:** Java 17, Spring Boot, Spring Data JPA, Spring Web.
- **Motor de Plantillas:** Thymeleaf.
- **Frontend:** HTML5, CSS3 y JavaScript vanilla
- **Base de Datos:** MySQL.
- **Almacenamiento de archivos:** Carpeta `static/uploads/` para archivos subidos por usuarios
- **Gestor de dependencias:** Maven (pom.xml).
- **Externo**: Highcharts para visualización de datos.

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
6. **Consultar estadistícas**: Visualiza estadisticas acerca de actividades y miembros
7. **Busca actividades:** Utiliza la barra de busqueda para encontrar actividades y evaluarlas con una nota.
5. **Volver:** Usa los botones de navegación para volver a secciones anteriores

## Cambios realizados con respecto a la versión anterior

1. **Migración total de framework:** El backend completo fue reescrito de Flask (Python) a Spring Boot (Java), reemplazando SQLAlchemy por Spring Data JPA y Jinja2 por Thymeleaf.

2. Buscador Asíncrono:

- Creación de buscador.html y buscador.js.

3. Sistema de Evaluación:

- Guardar y actualizar notas por actividad

