import React from "react"; // Ensure this line is present if necessary

import userImage from "../Images/user.png"; // Import a default user image

const About = () => {
  return (
    <div>
      <h1>About this project</h1>

      <p>This project is developed by: Fatima Said Al-Amri.</p>

      <p>Email: 46S1915@utas.edu.om</p>

      <img src={userImage} alt="devimage" className="userImage" />
    </div>
  );
};

export default About;
