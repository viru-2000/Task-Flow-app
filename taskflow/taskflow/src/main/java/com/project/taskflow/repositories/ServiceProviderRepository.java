package com.project.taskflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.taskflow.models.ServiceProvider;
import java.util.Optional; // Import Optional

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> { // Use Long for ID
    // Add custom queries if needed (e.g., findByMobileNumber)
    // Example: ServiceProvider findByMobileNumber(String mobileNumber);

    Optional<ServiceProvider> findById(Long id); // Find by ID - returns an Optional
}