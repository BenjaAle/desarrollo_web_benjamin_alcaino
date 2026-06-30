package cc5002.tarea4.repositories;

import cc5002.tarea4.models.Miembro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MiembroRepository extends JpaRepository<Miembro, Integer> {
    @Query("""
        SELECT FUNCTION('DATE', m.fechaRegistro), COUNT(m)
        FROM Miembro m
        GROUP BY FUNCTION('DATE', m.fechaRegistro)
        ORDER BY FUNCTION('DATE', m.fechaRegistro)
    """)
    List<Object[]> contarPorDia();
}