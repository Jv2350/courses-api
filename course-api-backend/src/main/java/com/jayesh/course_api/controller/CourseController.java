@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired private CourseRepository courseRepo;
    @Autowired private CourseService courseService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Course course) {
        try {
            return ResponseEntity.ok(courseService.createCourse(course));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Course> all() {
        return courseRepo.findAll();
    }

    @GetMapping("/{id}")
    public Course one(@PathVariable Long id) {
        return courseRepo.findById(id).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            courseService.deleteCourse(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}
