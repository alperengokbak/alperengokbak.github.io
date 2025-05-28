import React, { useState } from "react";
import ImageModal from "./ImageModal";

export default function Project({ twitter_frontend, BookingHotelSs, PrescriptionManagement, SwaggerUi }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <h1 className="projects-header">Projects</h1>
      <div className="flex justify-center">
        <div className="projects-containers">
          {[
            {
              title: "Booking Hotel",
              imgSrc: BookingHotelSs,
              description:
                "The live site is currently unavailable because the free database hosting plan has expired. However, I recorded a demo video earlier to showcase its features.",
              videoLink: "https://www.youtube.com/watch?v=SRnzqtjv-tE",
              link: "https://booking-hotel-sntf.onrender.com/",
            },
            {
              title: "Prescription Management",
              imgSrc: PrescriptionManagement,
              description:
                "The application is currently offline due to the free database hosting plan being over. A demo video I recorded earlier is available to highlight its functionality.",
              videoLink: "https://www.youtube.com/watch?v=ZMvQaYzIY6w",
              link: "https://prescription-frontend.onrender.com/",
            },
            {
              title: "Airline Management System",
              imgSrc: SwaggerUi,
              description:
                "This web application, built with Node.js and Express, manages airline operations such as booking, cancellations, and flight information. It includes user authentication to handle passenger accounts securely.",
              link: "https://github.com/alperengokbak/Airline-Management-System",
            },
            {
              title: "Twitter Clone",
              imgSrc: twitter_frontend,
              description:
                "I developed a Twitter clone using React, Node.js, Express, and PostgreSQL. It was a valuable learning experience and part of a project I worked on during my internship.",
              link: "https://github.com/alperengokbak/TwitterFrontend",
            },
            {
              title: "Twitter Clone Backend",
              imgSrc: twitter_frontend,
              description:
                "This repo is backend server of Twitter Clone. You can reach out github repository from the below website link.",
              link: "https://github.com/alperengokbak/TwitterBackend",
            },
          ].map((project, index) => (
            <div key={index} className="projects-container">
              <h1 className="projects-title">{project.title}</h1>
              <img
                src={project.imgSrc}
                alt={project.title}
                className="projects-image cursor-pointer"
                onClick={() => openModal(project.imgSrc)}
              />
              <p className="projects-text">{project.description}</p>
              {project.videoLink && (
                <a href={project.videoLink} className="projects-link hover:underline">
                  Click here to watch the video.
                </a>
              )}
              <a target={"_blank"} href={project.link} className="projects-link">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>

      <ImageModal isOpen={isModalOpen} onClose={closeModal} imgSrc={selectedImage} />
    </>
  );
}
