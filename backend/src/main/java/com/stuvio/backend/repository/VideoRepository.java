package com.stuvio.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findBySubject(Subject subject);
}