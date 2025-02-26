
import React from "react";

const NotFound = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "50px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "2rem",
      color: "#ff4d4d",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>404 - Page Not Found</h2>
      <p style={styles.paragraph}>The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
