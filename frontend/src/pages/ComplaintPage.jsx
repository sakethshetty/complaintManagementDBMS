// Import React and useState hook
import React,{useEffect} from "react";
import ComplaintForm from "../components/ComplaintForm";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const navigate = useNavigate()

  useEffect(() => {

      axios.get("/auth", {
        withCredentials : true
      })
      .then(res => console.log(res))
      .catch(err => navigate('/login'))
  })

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