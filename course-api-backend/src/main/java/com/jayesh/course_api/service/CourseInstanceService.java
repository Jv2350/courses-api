@Service
public class CourseInstanceService {
    @Autowired private CourseInstanceRepository instanceRepo;
    @Autowired private CourseRepository courseRepo;

    public CourseInstance createInstance(String courseId, int year, int semester) {
        Course course = courseRepo.findByCourseId(courseId).orElseThrow();
        CourseInstance instance = new CourseInstance();
        instance.setCourse(course);
        instance.setYear(year);
        instance.setSemester(semester);
        return instanceRepo.save(instance);
    }

    public List<CourseInstance> listInstances(int year, int semester) {
        return instanceRepo.findByYearAndSemester(year, semester);
    }

    public CourseInstance getInstance(int year, int semester, String courseId) {
        return instanceRepo.findByYearAndSemester(year, semester).stream()
            .filter(i -> i.getCourse().getCourseId().equals(courseId))
            .findFirst().orElseThrow();
    }

    public void deleteInstance(int year, int semester, String courseId) {
        List<CourseInstance> instances = instanceRepo.findByYearAndSemester(year, semester);
        for (CourseInstance i : instances) {
            if (i.getCourse().getCourseId().equals(courseId)) {
                instanceRepo.delete(i);
                return;
            }
        }
        throw new RuntimeException("Instance not found");
    }
}
