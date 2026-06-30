package cc5002.tarea4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "region") //Nombre de la tabla en la BDD
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Autoincremento
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 200)
    private String nombre;

    // Constructor vacío
    public Region() {
    }

    // Constructor con parametro
    public Region(String nombre) {
        this.nombre = nombre;
    }

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
