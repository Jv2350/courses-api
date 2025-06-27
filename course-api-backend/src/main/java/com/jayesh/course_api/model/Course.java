@Entity
public class Course {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String courseId;
    private String description;

    @ManyToMany
    private List<Course> prerequisites;

    // Getters & Setters
}
