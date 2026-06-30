package cc5002.tarea4.repositories;

import cc5002.tarea4.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    // Consulta para el buscador
    @Query("SELECT a FROM Actividad a WHERE " +
           "LOWER(a.nombre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.descripcion) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.miembro.comuna.nombre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Actividad> buscarPorKeyword(@Param("keyword") String keyword);

    // Consulta para contar actividades por tipo
    @Query("""
        SELECT a.tipo, COUNT(a)
        FROM Actividad a
        GROUP BY a.tipo
    """)
    List<Object[]> contarPorTipo();    

    // Consulta para contar actividades por comuna
    @Query("""
        SELECT a.miembro.comuna.nombre, COUNT(a)
        FROM Actividad a
        GROUP BY a.miembro.comuna.nombre
    """)
    List<Object[]> contarPorComuna();

    Page<Actividad> findByTipo(String tipo, Pageable pageable);
    

}