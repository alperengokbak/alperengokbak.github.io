import React from "react";

// Background Image And Photos
import sweden from "./assets/sweden.jpeg";
import photo from "./assets/photo.jpeg";
import DockerMedium from "./assets/DockerMedium.webp";
import BookingHotelSs from "./assets/BookingHotelSs.jpeg";
import PrescriptionManagement from "./assets/PrescriptionManagement.png";
import SwaggerUi from "./assets/Swagger_ui.png";

// Typewriter
import Typewriter from "typewriter-effect";

// Components
import ButtonComponent from "./components/ButtonComponent.jsx";
import SocialMediaLinks from "./components/SocialMediaComponent.jsx";
import WhoIs from "./components/WhoIs.jsx";
import Blogs from "./components/Blogs.jsx";
import Project from "./components/Project.jsx";

function App() {
  return (
    <div className="bg-color">
      <img src={sweden} className="bg-image" />
      <div className="card-location xs:mt-6 sm:mt-0">
        <div className="card-container">
          <div className="card-elements">
            <h1 className="text-7xl card-text">Alperen Gökbak</h1>
            <h2 className="text-3xl card-text">
              <Typewriter
                options={{
                  strings: ["Full Stack Developer", "Cloud Engineer", "DevOps Engineer", "Software Engineer"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </h2>
            <ButtonComponent />
            <SocialMediaLinks />
          </div>
        </div>
      </div>
      <WhoIs photo={photo} />
      <Project SwaggerUi={SwaggerUi} BookingHotelSs={BookingHotelSs} PrescriptionManagement={PrescriptionManagement} />
      <Blogs DockerMedium={DockerMedium} />
      <div className="footer">
        <p className="footer-text">© 2024 Alperen Gökbak</p>
      </div>
    </div>
  );
}

export default App;
