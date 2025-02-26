package com.project.taskflow.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.taskflow.dtos.ReviewDTO;
import com.project.taskflow.models.Review;
import com.project.taskflow.repositories.ReviewRepository;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // GET all reviews
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // POST a new review
    @PostMapping("/add")
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO) {
        Review review = new Review(
                reviewDTO.getName(),
                reviewDTO.getRating(),
                reviewDTO.getText(),
                reviewDTO.getCategory()
        );

        Review savedReview = reviewRepository.save(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // GET a single review by ID
    @GetMapping("/{id}")  // New: Get by ID
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .map(review -> new ResponseEntity<>(review, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    // PUT update an existing review
    @PutMapping("/update/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO) {
        return reviewRepository.findById(id)
                .map(review -> {
                    review.setName(reviewDTO.getName());
                    review.setRating(reviewDTO.getRating());
                    review.setText(reviewDTO.getText());
                    review.setCategory(reviewDTO.getCategory());
                    Review updatedReview = reviewRepository.save(review);
                    return new ResponseEntity<>(updatedReview, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // DELETE a review
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}