import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/styles/service.css";
import Footer from "../components/Footer";

const Services = () => {
  const [services, setServices] = useState([]); // State to store API data

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8080/api/subcategories/all")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "#f8f9fa",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        Our Services
      </div>

      <div className="serviceline"></div>

      <section className="services-section">
        <h2>Your Task, Our Priority</h2>
        <div className="service-category">
          {services.map((subService) => (
            <div className="service-card" key={subService.id}>
              {/* Service Name (Main Category) */}
              <h2>{subService.service.name}</h2>

              {/* Service Description */}
              <p>{subService.service.description}</p>
              <hr />

              {/* SubService Name */}
              <h4>{subService.name}</h4>

              {/* Learn More Button */}
              <Link
                to={`/booking/`}
                className="btn btn-primary"
              >
                Book Now
              </Link>
             
            </div>
          ))}
        </div>
       
      </section>

      <Footer />
    </div>
  );
};

export default Services;
