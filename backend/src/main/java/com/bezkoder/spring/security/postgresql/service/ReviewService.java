package com.bezkoder.spring.security.postgresql.service;

import com.bezkoder.spring.security.postgresql.models.Party;
import com.bezkoder.spring.security.postgresql.models.Review;
import com.bezkoder.spring.security.postgresql.models.User;
import com.bezkoder.spring.security.postgresql.payload.request.ReviewRequest;
import com.bezkoder.spring.security.postgresql.repository.PartyRepository;
import com.bezkoder.spring.security.postgresql.repository.ReviewRepository;
import com.bezkoder.spring.security.postgresql.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PartyRepository partyRepository;

    public Review createReview(ReviewRequest request) {
        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        User target = userRepository.findById(request.getTargetId())
                .orElseThrow(() -> new RuntimeException("Target not found"));
        Party event = partyRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Review review = new Review();
        review.setAuthor(author);
        review.setTarget(target);
        review.setRating(request.getRating());
        review.setText(request.getText());
        review.setEvent(event);

        return reviewRepository.save(review);
    }

    public Review updateReview(int id, ReviewRequest request) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        User target = userRepository.findById(request.getTargetId())
                .orElseThrow(() -> new RuntimeException("Target not found"));
        Party event = partyRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        review.setAuthor(author);
        review.setTarget(target);
        review.setRating(request.getRating());
        review.setText(request.getText());
        review.setEvent(event);

        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(int id) {
        return reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public void deleteReview(int id) {
        reviewRepository.deleteById(id);
    }
}
