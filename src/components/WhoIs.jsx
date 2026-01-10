import React from "react";

export default function WhoIs({ photo }) {
  return (
    <section className="who-is-container" id="who-is">
      <img src={photo} className="my-photo" />
      <div className="about-me-text-con">
        <h1 className="who-is">
          Who.is <span className="vibrate">?</span>
        </h1>
        <h2 className="text-3xl mb-4 text-neutral-300">Alperen Gökbak</h2>
        <p className="about-me-text">
          I am Alperen Gökbak, a Software Engineer, currently pursuing a Bachelor's degree in Software Engineering at
          Yasar University. I have interned at Univenn, working on projects using Node.js and React, and gaining
          experience in both frontend and backend development.
        </p>

        <p className="about-me-text">
          My technical skills include JavaScript, Java, Python, Node.js, Express.js, ReactJS, React Native, SQL, and
          NoSQL. Also I am proficient in Git and GitHub, with certifications in Linux, network technologies, and Python.
        </p>

        <p className="about-me-text">
          Outside of work I like to play basketball and meet new people. I enjoy being social and interacting with
          different groups, discovering activities to motivate myself. I enjoy mountain climbing, seeing different
          countries and getting to know different cultures.
        </p>
      </div>
    </section>
  );
}
