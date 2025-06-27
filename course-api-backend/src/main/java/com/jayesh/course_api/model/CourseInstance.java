@Entity
public class CourseInstance {
    @Id @GeneratedValue
    private Long id;
    private int year;
    private int semester;

    @ManyToOne
    private Course course;

    // Getters & Setters
}
