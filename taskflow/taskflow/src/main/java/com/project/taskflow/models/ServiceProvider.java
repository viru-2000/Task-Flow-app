package com.project.taskflow.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ServiceProviders") // Match table name exactly (case-sensitive)
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Use Integer for nullable IDs

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String mobileNumber;

    @Column(columnDefinition = "TEXT") // For TEXT data type
    private String services;

    @Enumerated(EnumType.STRING) // Store enum as String in database
    @Column(columnDefinition = "ENUM('Active', 'Inactive') DEFAULT 'Active'")
    private Status status = Status.Active; // Default value

    // Enum for Status
    public enum Status {
        Active,
        Inactive
    }

    // Constructors (Important: Include no-args constructor)
    public ServiceProvider() {} // No-args constructor is often required by JPA

    public ServiceProvider(String name, String mobileNumber, String services) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.services = services;
    }

    // Getters and Setters (For all fields)
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    @Override
    public String toString() {
        return "ServiceProvider{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", services='" + services + '\'' +
                ", status=" + status +
                '}';
    }
}

