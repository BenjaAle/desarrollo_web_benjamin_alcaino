package cc5002.tarea4.controllers;

import cc5002.tarea4.models.Actividad;
import cc5002.tarea4.models.Nota;
import cc5002.tarea4.models.Comentario;
import cc5002.tarea4.repositories.ComentarioRepository;
import cc5002.tarea4.repositories.ActividadRepository;
import cc5002.tarea4.repositories.NotaRepository;
import cc5002.tarea4.repositories.MiembroRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController // Devuelve JSON en vez de HTML
public class ApiController {

    private final ActividadRepository actividadRepository;
    private final MiembroRepository miembroRepository;
    private final NotaRepository notaRepository;
    private final ComentarioRepository comentarioRepository;

    public ApiController(
            ActividadRepository actividadRepository,
            MiembroRepository miembroRepository,
            NotaRepository notaRepository,
            ComentarioRepository comentarioRepository) {

        this.actividadRepository = actividadRepository;
        this.miembroRepository = miembroRepository;
        this.notaRepository = notaRepository;
        this.comentarioRepository = comentarioRepository;
    }

    // Ruta para que js haga el fetch de las actividades según la keyword
    @GetMapping("/api/actividades/buscar")
    public List<Map<String, Object>> buscarActividades(@RequestParam("q") String keyword) {
        
        // Utilizar la consulta de ActvidadRepository
        List<Actividad> actividades = actividadRepository.buscarPorKeyword(keyword);
        
        // Convertir lista a JSON
        List<Map<String, Object>> resultados = new ArrayList<>();

        for (Actividad act : actividades) {
            Map<String, Object> dto = new HashMap<>();
            
            // Agregar los campos que quiero ver
            dto.put("id", act.getId());
            dto.put("nombre", act.getNombre());
            dto.put("descripcion", act.getDescripcion());
            dto.put("dia", act.getDia());
            dto.put("tipo", act.getTipo());
            
            // Carga para evitar errores
            dto.put("miembro", act.getMiembro().getNombre());
            dto.put("comuna", act.getMiembro().getComuna().getNombre());
            
            // Revisar si esta actividad ya tiene nota en la BD
            Optional<Nota> notaOptional = notaRepository.findByActividadId(act.getId());
            if (notaOptional.isPresent()) {
                dto.put("nota", notaOptional.get().getValorNota()); // Si tiene, se envia el valor
            } else {
                dto.put("nota", "-"); // Si no, guion
            }

            resultados.add(dto);
        }

        return resultados; // Devuelve la lista de actividades como JSON
    }
    
    // Recibir la nota de una actividad y guardarla en la base de datos
    @PostMapping("/api/actividades/{id}/evaluar")
    public ResponseEntity<?> evaluarActividad(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        try {
            int valor = Integer.parseInt(body.get("nota"));
            
            // Que sea valor entre 1 y 7
            if (valor < 1 || valor > 7) {
                return ResponseEntity.badRequest().body(Map.of("error", "Nota inválida"));
            }

            Actividad act = actividadRepository.findById(id).orElseThrow();
            
            // Ver que no haya sido evaluada antes
            if(notaRepository.findByActividadId(id).isPresent()){
                return ResponseEntity.badRequest().body(Map.of("error", "Esta actividad ya fue evaluada"));
            }

            // Crear nota, guardarla en la BDD y devolver el valor
            Nota nuevaNota = new Nota(act, valor);
            notaRepository.save(nuevaNota);
            
            return ResponseEntity.ok(Map.of("success", true, "nota", valor));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error procesando evaluación"));
        }
    }

    @GetMapping("/api/miembros-dia")
    public Map<String,Object> miembrosDia(){

        List<Object[]> datos = miembroRepository.contarPorDia();

        List<String> dias = new ArrayList<>();
        List<Long> cantidades = new ArrayList<>();

        for(Object[] fila : datos){
            dias.add(fila[0].toString());
            cantidades.add((Long) fila[1]);
        }

        Map<String,Object> salida = new HashMap<>();
        salida.put("dias", dias);
        salida.put("cantidades", cantidades);

        return salida;
    }

    @GetMapping("/api/actividades-tipo")
    public List<Map<String,Object>> actividadesTipo(){

        List<Object[]> datos = actividadRepository.contarPorTipo();

        List<Map<String,Object>> salida = new ArrayList<>();

        for(Object[] fila : datos){

            Map<String,Object> obj = new HashMap<>();

            obj.put("name", fila[0]);
            obj.put("y", fila[1]);

            salida.add(obj);
        }

        return salida;
    }

    @GetMapping("/api/actividades-comuna")
    public Map<String,Object> actividadesComuna(){

        List<Object[]> datos = actividadRepository.contarPorComuna();

        List<String> comunas = new ArrayList<>();
        List<Long> cantidades = new ArrayList<>();

        for(Object[] fila : datos){

            comunas.add((String) fila[0]);
            cantidades.add((Long) fila[1]);

        }

        Map<String,Object> salida = new HashMap<>();

        salida.put("comunas", comunas);
        salida.put("cantidades", cantidades);

        return salida;
    }

    @GetMapping("/api/comentarios/{actividadId}")
    public List<Map<String,Object>> obtenerComentarios(
            @PathVariable Integer actividadId){

        List<Comentario> comentarios =
                comentarioRepository.findByActividadIdOrderByFechaDesc(actividadId);

        DateTimeFormatter formato =
                DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        List<Map<String,Object>> salida = new ArrayList<>();

        for(Comentario c : comentarios){

            Map<String,Object> obj = new HashMap<>();

            obj.put("nombre", c.getNombre());
            obj.put("texto", c.getTexto());
            obj.put("fecha", c.getFecha().format(formato));

            salida.add(obj);
        }

        return salida;
    }

    @PostMapping("/api/comentarios/{actividadId}")
    public ResponseEntity<?> agregarComentario(
            @PathVariable Integer actividadId,
            @RequestBody Map<String,String> body){

        String nombre = body.get("nombre").trim();
        String texto = body.get("texto").trim();

        if(nombre.length() < 3 || nombre.length() > 80){
            return ResponseEntity.badRequest()
                    .body(Map.of("error","Nombre inválido"));
        }

        if(texto.length() < 5){
            return ResponseEntity.badRequest()
                    .body(Map.of("error","Comentario inválido"));
        }

        Actividad actividad =
                actividadRepository.findById(actividadId).orElseThrow();

        Comentario comentario = new Comentario();

        comentario.setNombre(nombre);
        comentario.setTexto(texto);
        comentario.setFecha(LocalDateTime.now());
        comentario.setActividad(actividad);

        comentarioRepository.save(comentario);

        return ResponseEntity.ok(Map.of("mensaje","ok"));
    }
}

