package com.project.taskflow.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.taskflow.dtos.ServiceProviderDTO;
import com.project.taskflow.models.ServiceProvider;
import com.project.taskflow.repositories.ServiceProviderRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/serviceProviders")
public class ServiceProviderController {

	
    private final ServiceProviderRepository serviceProviderRepository;

    public ServiceProviderController(ServiceProviderRepository serviceProviderRepository) {
        this.serviceProviderRepository = serviceProviderRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addServiceProvider(@RequestBody ServiceProviderDTO serviceProviderDTO) {
        try {
            System.out.println("Received data: " + serviceProviderDTO);

            ServiceProvider serviceProvider = new ServiceProvider();
            // Map DTO to Entity (IMPORTANT!)
            serviceProvider.setName(serviceProviderDTO.getName());
            serviceProvider.setMobileNumber(serviceProviderDTO.getMobileNumber());
            serviceProvider.setServices(serviceProviderDTO.getServices());
            // ... map other fields if you have any (status, etc.) - set status to active if required

            ServiceProvider savedServiceProvider = serviceProviderRepository.save(serviceProvider); // Save to database

            return ResponseEntity.ok(savedServiceProvider); // Return the saved entity (not just a string)

        } catch (DataIntegrityViolationException ex) { // Handle unique constraint violation
            String errorMessage = "Mobile number already exists.";
            if (ex.getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
              errorMessage = "Mobile number already exists.";
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", errorMessage)); // 400 Bad Request

        } catch (Exception e) {
            e.printStackTrace(); // VERY IMPORTANT FOR DEBUGGING
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to add service provider: " + e.getMessage())); // 500
        }
    }

    @GetMapping("/all")
    public List<ServiceProvider> getAllServiceProviders() {
        return serviceProviderRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServiceProvider(@PathVariable Long id) {
        try {
            Optional<ServiceProvider> serviceProviderOptional = serviceProviderRepository.findById(id);
            if (!serviceProviderOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Service provider not found"));
            }

            ServiceProvider serviceProvider = serviceProviderOptional.get();
            serviceProviderRepository.delete(serviceProvider);
            return ResponseEntity.ok(Map.of("message", "Service provider deleted successfully")); // 200 OK

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete service provider: " + e.getMessage())); // 500
        }
    }

}

