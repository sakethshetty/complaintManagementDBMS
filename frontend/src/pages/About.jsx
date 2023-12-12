// Import React
import React from 'react';
import NavBar from '../components/NavBar';

// Define some CSS styles for the container, title, subtitle, and paragraph elements
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
};

const titleStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '48px',
    color: '#333333',
    justifyContent: 'center'
};

const subtitleStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '24px',
    color: '#333',
};

const paragraphStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '18px',
    color: '#333',
    textAlign: 'center',
    maxWidth: '600px',
};

// Create a React component for the about page
function About() {
    return (
        <>
            <NavBar />
            <div style={containerStyle}>
                <h1 style={titleStyle}>Complaint Management System</h1>
                <h2 style={subtitleStyle}>We do awesome things</h2>
                <p style={paragraphStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                    fermentum lorem. Morbi vitae leo quis sapien ultrices consequat. Fusce
                    quis lacus quis nisi sagittis aliquet. Quisque euismod, nisi at
                    condimentum tincidunt, lorem eros consequat augue, quis tincidunt nisl
                    lorem ut quam.
                </p>
            </div>
        </>
    );
}

// Export the component
export default About;
