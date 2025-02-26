package com.project.taskflow.controllers;

import org.springframework.web.bind.annotation.*;

import com.project.taskflow.models.SubCategory;
import com.project.taskflow.models.Service;
import com.project.taskflow.repositories.ServiceRepository;
import com.project.taskflow.repositories.SubCategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/subcategories")
public class SubCategoryController {

    private final SubCategoryRepository subCategoryRepository;
    private final ServiceRepository serviceRepository;  // Inject ServiceRepository

    // Constructor for dependency injection
    public SubCategoryController(SubCategoryRepository subCategoryRepository, ServiceRepository serviceRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.serviceRepository = serviceRepository;
    }
    
    @GetMapping("/all")
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    @GetMapping("/{serviceId}")
    public List<SubCategory> getSubCategoriesByService(@PathVariable Long serviceId) {
        return subCategoryRepository.findByServiceId(serviceId);
    }
    
    @PostMapping("/add")
    public SubCategory createSubCategory(@RequestBody SubCategory subCategory) {
        if (subCategory.getService() == null || subCategory.getService().getId() == null) {
            throw new IllegalArgumentException("Service and Service ID are required for creating a SubCategory."); // Or a more specific exception
        }

        Long serviceId = subCategory.getService().getId(); // Extract ID to avoid repeated calls
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));

        subCategory.setService(service);
        return subCategoryRepository.save(subCategory);
    }
}
