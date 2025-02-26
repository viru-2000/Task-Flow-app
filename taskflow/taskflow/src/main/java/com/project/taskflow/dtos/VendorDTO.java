package com.project.taskflow.dtos;

import java.util.Set; 

public class VendorDTO {

    private Long userId;         
    private String location;
    private Set<Long> servicesOffered; 

    
    public VendorDTO() {} 

    public VendorDTO(Long userId, String location, Set<Long> servicesOffered) {
        this.userId = userId;
        this.location = location;
        this.servicesOffered = servicesOffered;
       
    }

    

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Long> getServicesOffered() {
        return servicesOffered;
    }

    public void setServicesOffered(Set<Long> servicesOffered) {
        this.servicesOffered = servicesOffered;
    }

  
}
