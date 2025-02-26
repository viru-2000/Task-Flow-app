package com.project.taskflow.dtos;

public class ServiceProviderDTO {

    private String name;
    private String mobileNumber;
    private String services;
   

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
}

