import React, { useEffect, useState } from "react";
// import "../assets/styles/Dashboard.css";
import "../assets/styles/HeaderNavButton.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../assets/styles/Home.css";
import "../assets/styles/HeaderNavButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faTruck,
  faBroom,
  faHammer,
  faPaintRoller,
  faFire,
  faBuildingShield,
  faComputer,
  faHandshakeAngle,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";

import FurnitureAssemblyImage from "../assets/Images/image.png";
import HelpMovingImage from "../assets/Images/Moving.jpg";
import CleaningImage from "../assets/Images/Cleaning.jpg";
import MinnorRepairsImage from "../assets/Images/Repair.jpg";
import PaintingImage from "../assets/Images/painting.jpg";
import OfficeImage from "../assets/Images/image.png"; //images Change Here
import VirtualTaskImage from "../assets/Images/image.png"; //images Change Here
import PersonalAssistantImage from "../assets/Images/image.png"; //images Change Here
import HolidayHelp from "../assets/Images/image.png"; //images Change Here

import rating from "../assets/Images/trustpilot.jpg";
import { useNavigate } from "react-router-dom";
import serviceDetails from "../data/serviceDetailsData";
import axios from "axios";

const Userhome = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    title: "Select a category to see details",
    img: FurnitureAssemblyImage,
    description: "Click a category to view its details.",
  });
  const [serviceDetails, setServiceDetails] = useState([]);
  
  useEffect(() => {
    // Fetch data from backend
    axios
      .get("http://localhost:8080/api/services")
      .then((response) => {
        setServiceDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);
  const navigate = useNavigate();
  
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8080/api/reviews/all")
        .then((response) => response.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

  const services = [
    { id: 1, name: "Assembly", page: "/title-service/furniture-assembly" },
    { id: 2, name: "Handyman", page: "/title-service/handyman" },
    { id: 3, name: "Cleaning", page: "/title-service/cleaning" },
    { id: 4, name: "Moving", page: "/title-service/moving-services" },
    { id: 5, name: "Office Services", page: "/title-service/office-services" },
    { id: 6, name: "Personal", page: "/title-service/personal-assistant" },
    { id: 7, name: "Mounting", page: "/title-service/moving-services" },
    { id: 8, name: "Trending", page: "/title-service/featured-tasks" },
    { id: 9, name: "Holiday Help", page: "/title-service/holiday-help" },
  ];

  // Filter services based on the query
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handle search input and navigation
  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      navigate(filteredServices[0].page);
    } else {
      alert("No matching services found!");
    }
  };

  const categories = {
    Assembly: {
      title: "Furniture Assembly",
      img: FurnitureAssemblyImage,
      description: "Get your furniture assembled quickly and professionally.",
    },
    Moving: {
      title: "Help Moving",
      img: (
        <section className="py-5 text-center bg-dark text-white">
          <div className="container">
            <h2 className="mb-4">Your satisfaction, guaranteed</h2>
            <p className="mb-5">
              If you're not satisfied, we'll work to make it right.
            </p>

            <div className="row">
              <div className="col-md-4 mb-4">
                <h3>Vetted Taskers</h3>
                <p>
                  Taskers are always background checked before joining the
                  platform.
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <h3>Dedicated Support</h3>
                <p>
                  Friendly service when you need us - every day of the week.
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <h3>Your Satisfaction, Guaranteed</h3>
                <p>If you're not satisfied, we'll work to make it right.</p>
              </div>
            </div>
          </div>
        </section>
      ),
      description: "Assistance with moving, lifting, and relocating items.",
    },

    Moving: {
      title: "Help Moving",
      img: HelpMovingImage,
      description: "Assistance with Help Moving.",
    },
    Cleaning: {
      title: "Cleaning",
      img: CleaningImage,
      description: "Professional cleaning services for your home or office.",
    },
    Repairs: {
      title: "Minor Repairs",
      img: MinnorRepairsImage,
      description: "Fix minor damages or issues around your house.",
    },
    Painting: {
      title: "Painting",
      img: PaintingImage,
      description: "Interior and exterior painting projects made easy.",
    },
    Office: {
      title: "Office Setup",
      img: OfficeImage,
      description: "Organize and optimize your workspace efficiently.",
    },
    Virtual: {
      title: "Virtual Tasks",
      img: VirtualTaskImage,
      description: "Get help with virtual and administrative tasks.",
    },
    Assistant: {
      title: "Personal Assistant",
      img: PersonalAssistantImage,
      description: "Delegate errands and personal assistant tasks with ease.",
    },
    Holiday: {
      title: "Holiday Help",
      img: HolidayHelp,
      description: "Assistance with holiday decorations and preparations.",
    },
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(categories[category]);
  };

  return (
    <div className="dashboard-page">
      <header className="bg-light py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="logo-link" to="/">
            <h1 className="h2 mb-1 logo-link">Task Flow Services</h1>
          </Link>

          <nav>
            <Link to="/get$10" className="me-3 button-50" role="button">
              Get 100 Rs.
            </Link>
            <Link to="/services" className="me-3 button-50" role="button">
              Book a Task
            </Link>
            <Link to="/user-account" className="me-1 button-50" role="button">
              Account
            </Link>
          </nav>
        </div>
      </header>

      <section className="text-center py-5">
        <div className="container">
          <div className="container title-home">
            <div className="title-home2">
              <h1 className="fw-bold">
                Book trusted help <br />
                for home tasks
              </h1>
            </div>
            <br />
          </div>

          <form onSubmit={handleSearch}>
            <div className="input-group home-search">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="What do you need help with?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="input-group-append home-search-btn">
                <button className="btn btn-success btn-sm">Search</button>
              </div>
            </div>
          </form>

          {/* Service Categories with Icons */}
          <div
            className="mt-2"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(categories).map((key) => (
              <div
                key={key}
                style={{ margin: "1px", textAlign: "center" }}
                onClick={() => handleCategoryClick(key)}
              >
                <FontAwesomeIcon
                  icon={
                    key === "Assembly"
                      ? faTools
                      : key === "Moving"
                      ? faTruck
                      : key === "Cleaning"
                      ? faBroom
                      : key === "Repairs"
                      ? faHammer
                      : key === "Painting"
                      ? faPaintRoller
                      : key === "Office"
                      ? faBuildingShield
                      : key === "Virtual"
                      ? faComputer
                      : key === "Assistant"
                      ? faHandshakeAngle
                      : faGifts
                  }
                  size="2x"
                />
                <br />
                <button className="assembly-card">
                  {categories[key].title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Details Section */}
      <div className="mt-5">
        <div
          style={{
            // border: "1px solid #ccc",
            borderRadius: "15px",
            overflow: "hidden",
            maxWidth: "1110px",
            height: "575px",
            margin: "0 auto",
          }}
        >
          {selectedCategory.img ? (
            <img
              src={selectedCategory.img}
              alt={selectedCategory.title}
              style={{
                width: "100%",
                height: "575px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "575px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ color: "#999" }}>No category selected</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Projects Section */}
      <section className="py-4">
      <div className="container">
        <h3 className="text-center mb-4">Services</h3>

        <div className="row">
          {serviceDetails.slice(0, 6).map((service) => (
            <div key={service.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card project-card">
                <img
                  src={"fallback-image.jpg"} // No banner in API, using default
                  alt={service.name || "Service Image"}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title pps">{service.name || "Default Title"}</h5>
                  <p className="card-text">{service.description || "No description available."}</p>
                  
                  <button className="btn btn-primary mt-auto" onClick={() => navigate("/booking")}>
            Book now
          </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/services")}>
            See More
          </button>
        </div>
      </div>
    </section>

      {/* Ratings Section */}
      
             <section className="py-5 bg-light">
            <div className="container">
              <h3 className="text-center mb-4">See what happy customers are saying</h3>
              <div className="row g-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="col-md-4">
                    <div className="p-3 bg-white border rounded text-center">
                      <h5>{review.name}</h5>
                      <p style={{ color: "#ffc107" }}>{review.rating}</p>
                      <p>{review.text}</p>
                      <a href="#" className="text-success">
                        {review.category}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      <br />
            <div className="text-center mt-4">
                  <img
                    src={rating}
                    alt="Trustpilot Rating"
                    style={{ width: "600px" }}
                  />
                </div>
            <br />  
      {/* Assurance Section */}
      <section className="py-5 text-center bg-light text-dark">
        <div className="container">
          <h2 className="mb-4">Your satisfaction, guaranteed</h2>
          <p className="mb-5">
            If you're not satisfied, we'll work to make it right.
          </p>

          <div className="row">
            <div className="col-md-4 mb-4">
              <h3>Vetted Taskers</h3>
              <p>
                Taskers are always background checked before joining the
                platform.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h3>Dedicated Support</h3>
              <p>Friendly service when you need us - every day of the week.</p>
            </div>

            <div className="col-md-4 mb-4">
              <h3>Your Satisfaction, Guaranteed</h3>
              <p>If you're not satisfied, we'll work to make it right.</p>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Userhome;
