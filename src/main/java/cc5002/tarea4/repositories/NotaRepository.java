package cc5002.tarea4.repositories;

import cc5002.tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    // Buscar una nota asociada a una actividad por id
    Optional<Nota> findByActividadId(Integer actividadId);
}
