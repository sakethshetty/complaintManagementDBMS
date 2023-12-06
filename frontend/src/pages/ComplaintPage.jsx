// Import React and useState hook
import React from "react";
import ComplaintForm from "../components/ComplaintForm";
import NavBar from "../components/NavBar";

// Define a custom component for the complaint page
function ComplaintPage() {
  // Define some styles for the page
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      margin: "1rem",
    },
    form: {
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }
  };

  // Return the JSX code for the page
  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>Complaint Page</h1>
        <ComplaintForm style={styles.form} />
      </div>
    </>
  );
}

export default ComplaintPage