package cc5002.tarea4.controllers;

import cc5002.tarea4.models.Actividad;
import cc5002.tarea4.models.Comuna;
import cc5002.tarea4.models.Miembro;
import cc5002.tarea4.models.Foto;
import cc5002.tarea4.repositories.ActividadRepository;
import cc5002.tarea4.repositories.ComunaRepository;
import cc5002.tarea4.repositories.MiembroRepository;
import cc5002.tarea4.repositories.FotoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.time.LocalDateTime;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Controller // Manejar las vistas
public class AppController {
    private final ActividadRepository actividadRepository;
    private final MiembroRepository miembroRepository;
    private final ComunaRepository comunaRepository;
    private final FotoRepository fotoRepository;

    public AppController(ActividadRepository actividadRepository, MiembroRepository miembroRepository, ComunaRepository comunaRepository, FotoRepository fotoRepository) {
        this.actividadRepository = actividadRepository;
        this.miembroRepository = miembroRepository;
        this.comunaRepository = comunaRepository;
        this.fotoRepository = fotoRepository;
    }

    @GetMapping("/") // Buscar la ruta
    public String index(Model model) {
        // Ultimas 5 actividades
        List<Actividad> ultimasActividades = actividadRepository.findAll(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"))
        ).getContent();

        System.out.println("N° Actividades: " + ultimasActividades.size());
        
        // Entregar lista de actividades al html
        model.addAttribute("ultimas_actividades", ultimasActividades);
        return "index"; // Busca index.html en templates
    }

    @GetMapping("/buscador")
    public String buscador() {
        return "buscador"; // Buscar buscador.html en templates
    }

    @GetMapping("/registrar_miembro")
    public String registrarMiembro() {
        return "miembros";
    }

    @GetMapping("/registrar_actividad")
    public String registrarActividad(Model model) {
        // Entregar lista de miembros al html
        model.addAttribute("miembros", miembroRepository.findAll());
        return "actividades";
    }

    @GetMapping("/listado")
    public String listado(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "Todos") String categoria,

            @RequestParam(defaultValue = "nombre") String orden,

            Model model) {

        Sort sort;

        switch (orden) {

            case "nombre-desc":
                sort = Sort.by("miembro.nombre").descending();
                break;

            case "actividad":
                sort = Sort.by("nombre").ascending();
                break;

            default:
                sort = Sort.by("miembro.nombre").ascending();
                break;
        }

        PageRequest pageable = PageRequest.of(page, 5, sort);

        Page<Actividad> actividades;

        if (categoria.equals("Todos")) {
            actividades = actividadRepository.findAll(pageable);
        } else {
            actividades = actividadRepository.findByTipo(categoria, pageable);
        }

        model.addAttribute("paginacion", actividades);
        model.addAttribute("categoriaActual", categoria);
        model.addAttribute("ordenActual", orden);

        return "listado";
    }

    @GetMapping("/detalle/{id}")
    public String detalle(@PathVariable Integer id, Model model) {
        Actividad actividad = actividadRepository.
        findById(id)
        .orElse(null);
        if (actividad == null) {
            return "redirect:/listado";
        }
        model.addAttribute("act", actividad);
        return "detalle";
    }

    @GetMapping("/estadisticas")
    public String estadisticas() {
        return "estadisticas";
    }

    @PostMapping("/registrar_miembro")
    public String guardarMiembro(

            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam String telefono,
            @RequestParam Integer comuna

    ) {

        Comuna comunaSeleccionada =
                comunaRepository.findById(comuna).orElseThrow();

        Miembro miembro = new Miembro();

        miembro.setNombre(nombre);
        miembro.setEmail(email);
        miembro.setTelefono(telefono);
        miembro.setFechaRegistro(LocalDateTime.now());
        miembro.setComuna(comunaSeleccionada);

        miembroRepository.save(miembro);

        return "redirect:/";
    }

    @PostMapping("/registrar_actividad")
    public String guardarActividad(

            @RequestParam("miembro_id") Integer miembroId,
            @RequestParam("nombre_actividad") String nombre,
            @RequestParam("categoria") String categoria,
            @RequestParam("dia") String dia,
            @RequestParam("hora_inicio") String horaInicio,
            @RequestParam("duracion") String duracion,
            @RequestParam(value = "archivos", required = false)
            MultipartFile[] archivos

    ) throws IOException {

        Miembro miembro =
                miembroRepository.findById(miembroId).orElseThrow();

        Actividad actividad = new Actividad();

        actividad.setMiembro(miembro);
        actividad.setNombre(nombre);
        actividad.setTipo(categoria);
        actividad.setDia(dia);
        actividad.setHoraInicio(horaInicio);
        actividad.setDuracion(duracion);

        actividadRepository.save(actividad);

        // guardar archivos
        if (archivos != null) {

            String uploadDir = System.getProperty("user.dir")
                    + File.separator
                    + "src"
                    + File.separator
                    + "main"
                    + File.separator
                    + "resources"
                    + File.separator
                    + "static"
                    + File.separator
                    + "uploads";

            File carpeta = new File(uploadDir);

            if (!carpeta.exists()) {
                carpeta.mkdirs();
            }

            for (MultipartFile archivo : archivos) {

                if (!archivo.isEmpty()) {

                    String nombreArchivo =
                            UUID.randomUUID() + "_" +
                            archivo.getOriginalFilename();

                    File destino = new File(carpeta, nombreArchivo);

                    archivo.transferTo(destino);

                    Foto foto = new Foto();

                    foto.setActividad(actividad);
                    foto.setNombreArchivo(nombreArchivo);
                    foto.setRutaArchivo("/uploads/" + nombreArchivo);

                    fotoRepository.save(foto);
                }
            }
        }

        return "redirect:/";
    }

}
