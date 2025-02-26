package com.project.taskflow.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.project.taskflow.dtos.LoginRequest;
import com.project.taskflow.models.Role;
import com.project.taskflow.models.User;
import com.project.taskflow.repositories.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

//    http://localhost:8080/api/users/register
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Received User: " + user);
        
        // Default role to USER if not provided
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
//    http://localhost:8080/api/users/login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // ✅ Convert Role to String (if it's an Enum)
                String userRole = user.getRole().name(); 

                return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "role", userRole  // Ensure role is a string
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }
    @DeleteMapping("/{id}")  // DELETE endpoint
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content on successful deletion
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to delete user")); // 500 Internal Server Error
        }
    }
}
