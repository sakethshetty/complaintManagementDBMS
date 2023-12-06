import React, { useState } from "react";

function ComplaintForm() {
  const [department, setDepartment] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ department, heading, description });
    setDepartment("");
    setHeading("");
    setDescription("");
  };

  const styles = {
    form: {
      width: "100%",
      maxWidth: "750px",
      margin: "auto",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "0.8rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "0.8rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
      resize : "vertical"
    },
    button: {
      width: "100%",
      padding: "0.8rem",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#333",
      cursor: "pointer",
    },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="department">
          Department
        </label>
        <select
          style={styles.select}
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">Select a department</option>
          <option value="sales">Sales</option>
          <option value="support">Support</option>
          <option value="finance">Finance</option>
          <option value="hr">HR</option>
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="heading">
          Complaint Heading
        </label>
        <input
          style={styles.input}
          type="text"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="description">
          Complaint Description
        </label>
        <textarea
          style={styles.textarea}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <button style={styles.button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ComplaintForm;
