import React from "react";

// Background Image
import northernlights from "./assets/northernlights.jpg";
import northernlights2 from "./assets/northernlights2.jpeg";
import northernlights3 from "./assets/northernLights3.jpeg";
import sweden from "./assets/sweden.jpeg";
import photo from "./assets/photo.jpg";

// Button Component
import ButtonComponent from "./components/ButtonComponent.jsx";

// Social Media Logo
import SocialMediaLinks from "./components/SocialMediaComponent.jsx";

function App() {
  return (
    <div className="bg-color">
      <img src={sweden} className="bg-image" />
      <div className="card-location xs:mt-6 sm:mt-0">
        <div className="card-container">
          <div className="card-elements">
            <h1 className="text-7xl card-text">Alperen Gökbak</h1>
            <h2 className="text-3xl card-text">Full Stack Developer</h2>
            <ButtonComponent />
            <SocialMediaLinks />
          </div>
        </div>
      </div>
      <div className="about-me-container">
        <img src={photo} className="my-photo" />
        <div className="about-me-text-con">
          <h1 className="who-is">Who.is ?</h1>
          <h2 className="text-3xl mb-4 text-neutral-300">Alperen Gökbak</h2>
          <p className="about-me-text">
            I am Alperen Gökbak, a Software Engineer, currently pursuing a Bachelor's degree in Software Engineering at
            Yasar University. I have interned at Univenn, working on projects using Node.js and React, and gaining
            experience in both frontend and backend development.
          </p>

          <p className="about-me-text">
            My technical skills include JavaScript, Java, Python, Node.js, Express.js, ReactJS, React Native, SQL, and
            NoSQL. Also I am proficient in Git and GitHub, with certifications in Linux, network technologies, and
            Python.
          </p>

          <p className="about-me-text">
            Outside of work I like to play basketball and meet new people. I enjoy being social and interacting with
            different groups, discovering activities to motivate myself. I enjoy mountain climbing, seeing different
            countries and getting to know different cultures.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
