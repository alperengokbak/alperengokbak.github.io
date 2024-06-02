import React from "react";

// Background Image
import sweden from "./assets/sweden.jpeg";
import photo from "./assets/photo.jpg";

// Components
import ButtonComponent from "./components/ButtonComponent.jsx";
import SocialMediaLinks from "./components/SocialMediaComponent.jsx";
import WhoIs from "./components/WhoIs.jsx";

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
      <WhoIs photo={photo} />
    </div>
  );
}

export default App;
