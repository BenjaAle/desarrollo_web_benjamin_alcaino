from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Comuna(db.Model):

    # Buscar tabla comuna en MySQL
    __tablename__ = "comuna"

    # Columnas
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, nullable=False)


class Miembro(db.Model):
    __tablename__ = "miembro"
    # id que va aumentando con cada miembro agregado
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    telefono = db.Column(db.String(15), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.now, nullable=False)
    comuna_id = db.Column(db.Integer, db.ForeignKey("comuna.id"), nullable=False)

    # Ver actividades de un miembro
    actividades = db.relationship("Actividad", backref="miembro", lazy=True)


class Actividad(db.Model):
    __tablename__ = "actividad"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    miembro_id = db.Column(db.Integer, db.ForeignKey("miembro.id"), nullable=False)
    dia = db.Column(
        db.Enum(
            "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"
        ),
        nullable=False,
    )
    hora_inicio = db.Column(db.String(5), nullable=False)
    duracion = db.Column(db.String(5), nullable=False)
    tipo = db.Column(
        db.Enum("arte", "deporte", "tecnología", "social", "recreación", "otra"),
        nullable=False,
    )
    nombre = db.Column(db.String(45), nullable=False)
    descripcion = db.Column(db.Text(500), nullable=True)

    # Aceder a las fotos de una actividad
    fotos = db.relationship("Foto", backref="actividad", lazy=True)


class Foto(db.Model):
    __tablename__ = "foto"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey("actividad.id"), nullable=False)


class Comentario(db.Model):
    __tablename__ = "comentario"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(80), nullable=False)
    texto = db.Column(db.String(300), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey("actividad.id"), nullable=False)

    # Conectar actividades con comentarios
    actividad = db.relationship("Actividad", backref="comentarios", lazy=True)
