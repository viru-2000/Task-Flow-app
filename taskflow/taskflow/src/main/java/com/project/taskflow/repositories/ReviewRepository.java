package com.project.taskflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.taskflow.models.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
