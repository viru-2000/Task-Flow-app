import React, { useState, useEffect } from "react";
import "../assets/styles/UserFeedback.css";
import { Link } from "react-router-dom";

const Userfeedback = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // State for editing
    const [updatedReviewData, setUpdatedReviewData] = useState({  // State for updated data
        name: "",
        rating: "",
        text: "",
        category: ""
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        fetch("http://localhost:8080/api/reviews/all")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("Unexpected API response format:", data);
                    setReviews([]);
                }
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) { // Confirmation
            fetch(`http://localhost:8080/api/reviews/delete/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status === 204) { // Check for 204 No Content
                        setReviews(reviews.filter((review) => review.id !== id));
                    } else if (response.status === 404) {
                        alert("Review not found.");
                    } else {
                        console.error("Failed to delete review:", response.status);
                        alert("Failed to delete review. Please try again."); // User-friendly alert
                    }
                })
                .catch((error) => {
                    console.error("Error deleting review:", error);
                    alert("An error occurred while deleting the review.");
                });
        }
    };


    const handleUpdate = () => {
        if (!updatedReviewData.name || !updatedReviewData.rating || !updatedReviewData.text || !updatedReviewData.category) {
            alert("Please fill in all fields.");
            return;
        }

        fetch(`http://localhost:8080/api/reviews/update/${editingReview.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReviewData),
        })
            .then((response) => {
                if (response.ok) {
                    fetchReviews(); // Refresh the reviews list after update
                    setEditingReview(null); // Close the edit form
                    setUpdatedReviewData({ name: "", rating: "", text: "", category: "" }); // Clear update form
                    alert("Review updated successfully!");
                } else {
                    console.error("Failed to update review:", response.status);
                    alert("Failed to update review. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error updating review:", error);
                alert("An error occurred while updating the review.");
            });
    };


    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h3 className="text-center mb-4">See what happy customers are saying</h3>
                <div className="row g-4">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="col-md-4">
                                <div className="p-3 bg-white border rounded text-center">
                                    <h5>{review.name}</h5>
                                    <p style={{ color: "#ffc107" }}>{review.rating} ★</p>
                                    <p>{review.text}</p>
                                    {review.category && (
                                        <a href={`/category/${review.category}`} className="text-success">
                                            {review.category}
                                        </a>
                                    )}
                                    <div className="mt-3">
                                      
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No reviews available.</p>
                    )}
                </div>

                {/* Edit Form */}
                {editingReview && (
                    <div className="mt-4 p-3 bg-white border rounded">
                        <h4>Edit Review</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Name"
                            value={updatedReviewData.name}
                            onChange={(e) => setUpdatedReviewData({ ...updatedReviewData, name: e.target.value })}
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Rating"
                            value={updatedReviewData.rating}
                            onChange={(e) => setUpdatedReviewData({ ...updatedReviewData, rating: e.target.value })}
                        />
                        <textarea
                            className="form-control mb-2"
                            placeholder="Text"
                            value={updatedReviewData.text}
                            onChange={(e) => setUpdatedReviewData({ ...updatedReviewData, text: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Category"
                            value={updatedReviewData.category}
                            onChange={(e) => setUpdatedReviewData({ ...updatedReviewData, category: e.target.value })}
                        />
                        <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
                        <button className="btn btn-secondary" onClick={() => setEditingReview(null)}>Cancel</button>
                    </div>
                )}
                  <div className="text-center mt-4">
                    <Link to="/admin" className="btn btn-primary">Back to Dashboard</Link>
                </div>
            </div>
        </section>
    );
};

export default Userfeedback;