package cc5002.tarea4.repositories;

import cc5002.tarea4.models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByActividadIdOrderByFechaDesc(Integer actividadId);
}
