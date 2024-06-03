import React, { useState } from "react";
import ImageModal from "./ImageModal";

export default function Project({ BookingHotelSs, PrescriptionManagement, SwaggerUi }) {
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
                "I can't really show the site because the free version of the database link is over, but there was a video I shot earlier.",
              videoLink: "https://www.youtube.com/watch?v=SRnzqtjv-tE",
              link: "https://booking-hotel-sntf.onrender.com/",
            },
            {
              title: "Prescription Management",
              imgSrc: PrescriptionManagement,
              description:
                "I can't really show the site because the free version of the database link is over, but there was a video I shot earlier.",
              videoLink: "https://www.youtube.com/watch?v=ZMvQaYzIY6w",
              link: "https://prescription-frontend.onrender.com/",
            },
            {
              title: "Airline Management System",
              imgSrc: SwaggerUi,
              description:
                "The project appears to be a web application built using Node.js and Express, with a focus on handling flight-related operations such as ticket booking, cancellation, and flight information retrieval. The application includes user authentication to manage passenger accounts.",
              link: "https://github.com/alperengokbak/Airline-Management-System",
            },
            {
              title: "Twitter Clone Frontend",
              imgSrc: "https://via.placeholder.com/150",
              description:
                "I've created a Twitter clone using React, Node.js, Express, and PostgreSQL. It was a fun project to work on and I learned a lot from it. I've created it while I'm at intern at a company.",
              link: "https://github.com/alperengokbak/TwitterFrontend",
            },
            {
              title: "Twitter Clone Backend",
              imgSrc: "https://via.placeholder.com/150",
              description:
                "I've created a Twitter clone using React, Node.js, Express, and PostgreSQL. It was a fun project to work on and I learned a lot from it. I've created it while I'm at intern at a company.",
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
              <a href={project.link} className="projects-link">
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
