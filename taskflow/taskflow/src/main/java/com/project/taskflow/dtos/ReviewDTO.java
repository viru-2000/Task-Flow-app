package com.project.taskflow.dtos;

public class ReviewDTO {
    private String name;
    private String rating;
    private String text;
    private String category;

    public ReviewDTO() {}

    public ReviewDTO(String name, String rating, String text, String category) {
        this.name = name;
        this.rating = rating;
        this.text = text;
        this.category = category;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
