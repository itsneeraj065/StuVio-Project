package com.stuvio.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "courses")


public class Course {
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Semester> semesters;
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String courseName;

    @Column(length = 500)
    private String description;
    
    @Column(nullable = false)
    private Integer totalSemesters;
}