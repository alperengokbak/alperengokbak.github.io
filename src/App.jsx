import React from "react";

// Background Image
import northernlights from "./assets/northernlights.jpg";
import northernlights2 from "./assets/northernlights2.jpeg";
import northernlights3 from "./assets/northernLights3.jpeg";
import sweden from "./assets/sweden.jpeg";

// Button Component
import ButtonComponent from "./components/ButtonComponent.jsx";

// Social Media Logo
import SocialMediaLinks from "./components/SocialMediaComponent.jsx";

function App() {
  return (
    <>
      <img src={sweden} className="bg-local bg-contain bg-no-repeat min-h-dvh max-h-dvh min-w-full" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:max-w-4xl bg-neutral-900 bg-opacity-90 rounded-xl gap-5 py-12">
            <h1 className="text-7xl font-extrabold font-serif text-white">Alperen Gökbak</h1>
            <h2 className="text-3xl font-semibold font-serif text-white">Full Stack Developer</h2>
            <ButtonComponent />
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
