@Service
public class CourseService {
    @Autowired private CourseRepository courseRepo;

    public Course createCourse(Course course) {
        for (Course pre : course.getPrerequisites()) {
            if (!courseRepo.findByCourseId(pre.getCourseId()).isPresent()) {
                throw new RuntimeException("Invalid prerequisite: " + pre.getCourseId());
            }
        }
        return courseRepo.save(course);
    }

    public void deleteCourseByCourseId(String courseId) {
        Course course = courseRepo.findByCourseId(courseId).orElseThrow();
        if (courseRepo.existsByPrerequisitesContaining(course)) {
            throw new RuntimeException("Cannot delete. Used as prerequisite.");
        }
        courseRepo.delete(course);
    }
}
