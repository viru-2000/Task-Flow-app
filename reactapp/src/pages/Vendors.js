import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarFilters from "../components/SidebarFilters";
import "../assets/styles/Vendors.css";
import imagesBook1 from "../assets/Images/vendorbook1.gif";
import imagesBook2 from "../assets/Images/vendorbook2.gif";

const Vendors = () => {
  const location = useLocation();
  const { formData, selectedServices } = location.state || {};
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [radius, setRadius] = useState(5); // Default radius in km
  const navigate = useNavigate();

  // Mock vendor data
  const mockVendors = [
    {
      id: 1,
      name: "Gina H.",
      rating: 4.9,
      hourlyRate: "$70.62",
      tasksCompleted: 154,
      distance: 3, // in km
      profilePicture: { imagesBook1 },
      description:
        "Meticulous cleaner with 5+ years of experience in cleaning private apartments. Maintains high standards of customer satisfaction.",
    },
    {
      id: 2,
      name: "Sabrine S.",
      rating: 5.0,
      hourlyRate: "$84.74",
      tasksCompleted: 116,
      distance: 7,
      profilePicture: { imagesBook1 },
      description:
        "Highly skilled in improving cleanliness for your home or business. Trusted for delivering excellent service.",
    },
    {
      id: 3,
      name: "Mahmoud D.",
      rating: 4.8,
      hourlyRate: "$70.62",
      tasksCompleted: 514,
      distance: 4,
      profilePicture: { imagesBook2 },
      description:
        "Obsessed with cleaning and organizing. Provides top-notch services for all cleaning needs.",
    },
  ];

  useEffect(() => {
    setVendors(mockVendors);
    setFilteredVendors(
      mockVendors.filter((vendor) => vendor.distance <= radius)
    );
  }, [radius]);

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
  };

  const handleBookNow = (vendor) => {
    navigate("/confirmation", {
      state: {
        formData,
        selectedServices,
        vendor,
      },
    });
  };

  return (
    <div className="vendors-container">
      {/* Sidebar */}
      <div className="col-md-3">
        <SidebarFilters radius={radius} onRadiusChange={handleRadiusChange} />
      </div>
      <h3 className="text-primary">Available Vendors</h3>
      {filteredVendors.length > 0 ? (
        filteredVendors.map((vendor) => (
          <div className="vendor-card" key={vendor.id}>
            <img
              src={vendor.profilePicture}
              alt={vendor.name}
              className="vendor-img"
            />
            <div className="vendor-details">
              <h5>{vendor.name}</h5>
              <span className="badge">GREAT VALUE</span>
              <p>
                Rating: <strong>{vendor.rating} ⭐</strong>
              </p>
              <p>
                Hourly Rate: <strong>{vendor.hourlyRate}</strong>
              </p>
              <p>
                Tasks Completed: <strong>{vendor.tasksCompleted}</strong>
              </p>
              <p>{vendor.description}</p>
              <p>
                Distance: <strong>{vendor.distance} km</strong>
              </p>
              <button
                onClick={() => handleBookNow(vendor)}
                className="vendor-button"
              >
                Select & Continue
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No vendors available within the selected radius.</p>
      )}
    </div>
  );
};

export default Vendors;