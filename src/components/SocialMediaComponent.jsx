import React from "react";

// Github And LinkedIn Icons
import Github from "../assets/github-mark/github-mark-white.png";
import LinkedIn from "../assets/LinkedIn-Logos/LI-In-Bug.png";
import Twitter from "../assets/x-logo/logo-white.png";
import Medium from "../assets/Logo/02_White/Symbol/PNG/RGB/Medium-Symbol-White-RGB@4x.png";

export default function SocialMediaLinks() {
  return (
    <div className="flex flex-row justify-center items-center w-full mt-12 gap-24">
      <a href="https://github.com/alperengokbak" target="_blank" rel="noopener noreferrer">
        <img src={Github} alt="GitHub" className="size-12" />
      </a>
      <a href="https://medium.com/@swalperen3008" target="_blank" rel="noopener noreferrer">
        <img src={Medium} alt="LinkedIn" className="size-12" />
      </a>
      <a href="https://www.linkedin.com/in/alperen-gokbak-68988a225/" target="_blank" rel="noopener noreferrer">
        <img src={LinkedIn} alt="GitHub" className="size-11" />
      </a>
      <a href="https://x.com/Alperengokbak" target="_blank" rel="noopener noreferrer">
        <img src={Twitter} alt="LinkedIn" className="size-11" />
      </a>
    </div>
  );
}