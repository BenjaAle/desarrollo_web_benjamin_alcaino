# Sistema de Gestión de Actividades

**CC5002 - Tarea 1**  
**Autor:** Benjamin Alcaino  
**Fecha de Entrega:** 14/04/2026

## Estructura de archivos

```
Tarea 01/
├── html/
│   ├── index.html              # Página principal con indicadores y métricas
│   ├── miembros.html           # Formulario de registro de miembros
│   ├── actividades.html        # Formulario de registro de actividades
│   ├── listado.html            # Listado de actividades
│   ├── detalle.html            # Detalle de una actividad específica
├── js/
│   ├── miembros.js             # Validaciones y lógica de registro de miembros
│   ├── actividades.js          # Validaciones y lógica de registro de actividades
│   ├── listado.js              # Filtrado, ordenamiento y paginación de actividades
├── imagenes/                   # Imágenes de actividades y gráficos
│   ├── 1.png
│   ├── 2.png
│   ├── ajedrez.avif
│   ├── pintura.avif
│   ├── futbol.avif
│   ├── robot.avif
│   └── libro.avif
├── style.css                   # Estilos
└── README.md                   # Este archivo

```

## Detalles o decisiones tomadas

#### Registro de Miembros (miembros.html y miembros.js):
- Nombre: 3-100 caracteres
- Email: formato válido (`usuario@dominio.extension`)
- Tipo de miembro: Obligatorio seleccionar alguno de la lista
- Campo dinámico: Cambia según el miembro seleccionado (Carrera para estudiante, departamento para académico y cargo para funcionario)

#### Registro de Actividades (actividades.html y actividades.js):
- Categoría: Obligatorio seleccionar alguno de la lista
- Días de la semana: acepta mayusculas, minusculas y separadores (ej: "Lunes, Miércoles y viernEs")
- Horas semanales: número > 0
- Archivo (foto/video): Acepta multiples archivos de imagenes y video. Se verifica que haya al menos un archivo
- Enlace: Opcional

#### Listado Actividades (listado.html y listado.js):
- Se almacenaron en arrays 5 actividades: Ajedrez, Pintura, Fútbol, Robótica y Lectura, para poder filtrar, ordenar y paginar. Los mismos arrays son utilizados en `listado.js` y `detalle.html` para que coincidan con la información. Cada uno tiene un id para poder hacer click y acceder a detalle.html para ver su información.
- La paginación permite no bajar de la primera página y no superar la ultima página. Se define una variable que es el máximo de elementos por página y se distribuye el total de actividades por página. Esto es compatible con los filtros y ordenamientos


#### index.html y detalle.html

No necesitan de un archivo.js debido a que no realizan validaciones. index.html solo muestra dos imagenes estaticas. detalle.html obtiene el id de la actividad a traves de la URL para mostrar su información.

## Uso de la página

index.html es la página principal y muestra dos imagenes estaticas que representan estadisticas. Para cambiar de secciones, se utiliza la barra de navegación que contiene Registro Miembros, Registro Actividades y Listado Actividades y cada uno manda a su html respectivo. Al seleccionar una actividad en listado de actividades, envia a detalle.html que muestra la informacion de la actividad, y la barra de navegacion cambia para solo mostrar la opcion de volver al listado. Los formularios refrescan los campos una vez que se "guarda" el registro para simular el comportamiento de que se guardó, aunque en realidad no se guardan.


