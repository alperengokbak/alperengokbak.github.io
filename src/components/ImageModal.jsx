import React from "react";

const ImageModal = ({ isOpen, onClose, imgSrc }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-model-container" onClick={handleBackgroundClick}>
      <div className="relative">
        <img src={imgSrc} alt="Full size" className="image-model-img" />
        <button className="image-model-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
