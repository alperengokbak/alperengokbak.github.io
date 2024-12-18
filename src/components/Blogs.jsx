import React from "react";

export default function Blogs({ DockerMedium }) {
  return (
    <>
      <h1 className="blogs-header">Blogs</h1>
      <div className="blogs-containers">
        <a href="https://medium.com/@swalperen3008/what-is-dockerize-and-dockerize-your-project-a-step-by-step-guide-899c48a34df6">
          <div className="blogs-container">
            <img src={DockerMedium} className="blog-image" />
            <h2 className="blog-title">What Is Dockerize And Dockerize Your Project: A Step-by-Step Guide</h2>
            <p className="blog-date">25.12.2021</p>
            <div className="blog-tags">
              <p className="tag">#Docker</p>
              <p className="tag">#Dockerize</p>
              <p className="tag">#Containerization</p>
              <p className="tag">#Python</p>
              <p className="tag">#Docker-Command</p>
              <p className="tag">#Devops</p>
            </div>
            <p className="blog-text">
              The page explains how to "Dockerize" a simple Flask application, detailing the benefits of using Docker
              for consistency, portability, and efficiency. It provides a step-by-step guide to creating a Dockerfile,
              building a Docker image, and running the application in a Docker container.
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
