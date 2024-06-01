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
    <div className="bg-neutral-900">
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
      <div className="flex flex-wrap flex-row justify-center items-center m-8 p-8 gap-8">
        <img src={photo} className="md:w-1/2 lg:w-1/4 rounded-xl w-11/12" />
        <div className="flex flex-col w-2/3 lg:w-1/3 text-lg p-8 gap-5">
          <h1 className="font-semibold font-serif text-neutral-200 mb-1 text-6xl">Who.is ?</h1>
          <h2 className="text-3xl mb-4 text-neutral-300">Alperen Gökbak</h2>
          <p className="font-medium font-sans text-neutral-400 mb-2">
            I am Alperen Gökbak, a Software Engineer, currently pursuing a Bachelor's degree in Software Engineering at
            Yasar University. I have interned at Univenn, working on projects using Node.js and React, and gaining
            experience in both frontend and backend development.
          </p>

          <p className="font-medium font-sans text-neutral-400 mb-4">
            My technical skills include JavaScript, Java, Python, Node.js, Express.js, ReactJS, React Native, SQL, and
            NoSQL. Also I am proficient in Git and GitHub, with certifications in Linux, network technologies, and
            Python.
          </p>

          <p className="font-medium font-sans text-neutral-400 mb-4">
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
