package com.stuvio.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String college;

    private String branch;

    private Integer semester;

    @Column(length = 1000)
    private String bio;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}