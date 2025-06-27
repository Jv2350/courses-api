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

    @GetMapping("/{courseId}")
    public ResponseEntity<?> one(@PathVariable String courseId) {
        return courseRepo.findByCourseId(courseId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> delete(@PathVariable String courseId) {
        try {
            courseService.deleteCourseByCourseId(courseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}
