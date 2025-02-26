package com.project.taskflow.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.taskflow.dtos.VendorDTO;
import com.project.taskflow.models.User;
import com.project.taskflow.models.Vendor;
import com.project.taskflow.repositories.UserRepository;
import com.project.taskflow.repositories.VendorRepository;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final VendorRepository vendorRepository;
    private  UserRepository userRepository;

    @Autowired
    public VendorController(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Vendor> createVendor(@RequestBody VendorDTO vendorDTO) { // Use DTO

        Optional<User> userOptional = userRepository.findById(vendorDTO.getUserId()); // Get user from DB
        
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Or appropriate error
        }

        User user = userOptional.get();

        Vendor vendor = new Vendor();
        vendor.setUser(user); 
        vendor.setLocation(vendorDTO.getLocation());
        

        Vendor savedVendor = vendorRepository.save(vendor);
        return new ResponseEntity<>(savedVendor, HttpStatus.OK); // Return 200 OK
    }

    @GetMapping("/all")
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @GetMapping("/location/{location}")
    public List<Vendor> getVendorsByLocation(@PathVariable String location) {
        return vendorRepository.findByLocation(location);
    }

    @GetMapping("/{id}")
    public Vendor getVendorById(@PathVariable Long id) {
        return vendorRepository.findById(id).orElse(null);
    }
}

