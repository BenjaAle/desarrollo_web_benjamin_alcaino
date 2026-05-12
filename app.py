import os
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from models import db, Miembro, Actividad, Foto

app = Flask(__name__)
# Credenciales indicadas en el enunciado
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+mysqlconnector://cc5002:programacionweb@localhost:3306/tarea2"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "clave_secreta"
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50 MB

# Subida de archivos a la carpeta static/uploads
UPLOAD_FOLDER = os.path.join("static", "uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db.init_app(app)


@app.route("/")
def index():
    # Obtener las últimas 5 actividades ingresadas
    ultimas = Actividad.query.order_by(Actividad.id.desc()).limit(5).all()
    return render_template("index.html", ultimas_actividades=ultimas)


@app.route("/registrar_miembro", methods=["GET", "POST"])
def registrar_miembro():
    if request.method == "POST":

        # Datos del formulario
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        tipo = request.form.get("tipo")
        comuna_id = request.form.get("comuna")

        # Validacion
        errores = []
        if not comuna_id:
            errores.append("Debe seleccionar una comuna.")

        if errores:
            return render_template("miembros.html", errores=errores)

        try:
            # Guardar en la BDD
            nuevo_miembro = Miembro(
                nombre=nombre, email=email, telefono=telefono, comuna_id=comuna_id
            )
            db.session.add(nuevo_miembro)
            db.session.commit()

            flash("Miembro guardado", "success")
            return redirect(url_for("index"))

        except Exception as e:
            db.session.rollback()
            return render_template("miembros.html", errores=[f"Error en BD: {str(e)}"])

    return render_template("miembros.html")


@app.route("/registrar_actividad", methods=["GET", "POST"])
def registrar_actividad():
    if request.method == "POST":

        miembro_id = request.form.get("miembro_id")  # Saber quien registra la actividad
        tipo_act = request.form.get("categoria")
        dia = request.form.get("dia")
        hora_inicio = request.form.get("hora_inicio", "12:00")  # Hora por defecto
        duracion = request.form.get("duracion")
        nombre_act = request.form.get("nombre_actividad", "Actividad")
        archivos = request.files.getlist("archivos")

        try:
            # Crear y guardar actividad
            nueva_actividad = Actividad(
                miembro_id=miembro_id,
                dia=dia,
                hora_inicio=hora_inicio,
                duracion=duracion,
                tipo=tipo_act,
                nombre=nombre_act,
            )
            db.session.add(nueva_actividad)
            db.session.flush()

            # Guardar archivos
            for file in archivos:
                if file and file.filename:
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
                    nueva_foto = Foto(
                        ruta_archivo=f"uploads/{filename}",
                        nombre_archivo=filename,
                        actividad_id=nueva_actividad.id,
                    )
                    db.session.add(nueva_foto)

            db.session.commit()
            flash("¡Actividad registrada exitosamente!", "success")
            return redirect(url_for("index"))
        except Exception as e:
            db.session.rollback()
            miembros_registrados = Miembro.query.all()
            return render_template(
                "actividades.html",
                errores=[f"Error: {str(e)}"],
                miembros=miembros_registrados,
            )

    # Si es GET, le pasamos los miembros para el <select>
    miembros_registrados = Miembro.query.all()
    return render_template("actividades.html", miembros=miembros_registrados)


@app.route("/listado")
def listado():
    page = request.args.get("page", 1, type=int)
    categoria_filtro = request.args.get("categoria", "Todos")
    orden_filtro = request.args.get("orden", "nombre")

    # Actividades vinculadas a sus miembros
    query = Actividad.query.join(Miembro)

    # Filtro de Categoría si no es "todos"
    if categoria_filtro != "Todos":
        # Coincidencia entre el tipo de actividad con el filtro seleccionado
        query = query.filter(Actividad.tipo == categoria_filtro)

    # Ordenamiento
    if orden_filtro == "nombre":
        query = query.order_by(Miembro.nombre.asc())
    elif orden_filtro == "nombre-desc":
        query = query.order_by(Miembro.nombre.desc())
    elif orden_filtro == "actividad":
        query = query.order_by(Actividad.nombre.asc())

    # 5 elementos por página
    actividades_paginadas = query.paginate(page=page, per_page=5)

    # entregar filtros al html para no perder paginacion
    return render_template(
        "listado.html",
        paginacion=actividades_paginadas,
        categoria_actual=categoria_filtro,
        orden_actual=orden_filtro,
    )


@app.route("/detalle/<int:id>")
def detalle(id):
    # Buscar actividad en la BDD por id
    act = Actividad.query.get_or_404(id)
    # pasar actividad al html para ver su detalle
    return render_template("detalle.html", act=act)


if __name__ == "__main__":
    app.run(debug=True)
