@RestController
@RequestMapping("/api/instances")
public class CourseInstanceController {
    @Autowired private CourseInstanceRepository instanceRepo;
    @Autowired private CourseRepository courseRepo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> payload) {
        try {
            String courseId = (String) payload.get("courseId");
            int year = (int) payload.get("year");
            int semester = (int) payload.get("semester");
            Course course = courseRepo.findByCourseId(courseId).orElseThrow();
            CourseInstance instance = new CourseInstance();
            instance.setCourse(course);
            instance.setYear(year);
            instance.setSemester(semester);
            return ResponseEntity.ok(instanceRepo.save(instance));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{year}/{semester}")
    public List<CourseInstance> list(@PathVariable int year, @PathVariable int semester) {
        return instanceRepo.findByYearAndSemester(year, semester);
    }

    @GetMapping("/{year}/{semester}/{courseId}")
    public ResponseEntity<?> details(@PathVariable int year, @PathVariable int semester, @PathVariable String courseId) {
        List<CourseInstance> instances = instanceRepo.findByYearAndSemester(year, semester);
        return instances.stream()
            .filter(i -> i.getCourse().getCourseId().equals(courseId))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{year}/{semester}/{courseId}")
    public ResponseEntity<?> delete(@PathVariable int year, @PathVariable int semester, @PathVariable String courseId) {
        List<CourseInstance> instances = instanceRepo.findByYearAndSemester(year, semester);
        for (CourseInstance i : instances) {
            if (i.getCourse().getCourseId().equals(courseId)) {
                instanceRepo.delete(i);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
}
