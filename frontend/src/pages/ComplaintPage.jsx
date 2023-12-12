// Import React and useState hook
import React,{useEffect, useState} from "react";
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
  const [msg, setMsg] = useState('');

  useEffect(() => {

      axios.get("http://localhost:5000/auth", {
        withCredentials : true
      })
      .then(res => {
        setMsg("Submitted!")
      })
      .catch(err => {console.log(err);navigate('/login')})
  })

  // Return the JSX code for the page
  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>Complaint Page</h1>
        {msg && <p>{msg}</p>}
        <ComplaintForm style={styles.form} />
      </div>
    </>
  );
}

export default ComplaintPage