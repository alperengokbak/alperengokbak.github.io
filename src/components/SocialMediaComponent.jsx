import Github from "../assets/github-mark/github-mark-white.png";
import LinkedIn from "../assets/LinkedIn-Logos/LI-In-Bug.png";
import Twitter from "../assets/x-logo/logo-white.png";
import Medium from "../assets/Logo/02_White/Symbol/PNG/RGB/Medium-Symbol-White-RGB@4x.png";

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/alperengokbak", icon: Github },
  { name: "Medium", href: "https://medium.com/@alperengokbak", icon: Medium },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alperengokbak/", icon: LinkedIn },
  { name: "X", href: "https://x.com/Alperengokbak", icon: Twitter },
];

export default function SocialMediaLinks({ className = "" }) {
  const wrapperClass = className ? `social-links ${className}` : "social-links";

  return (
    <div className={wrapperClass}>
      {SOCIAL_LINKS.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-media-btn"
          aria-label={`Visit ${name}`}
          title={name}
        >
          <img src={icon} alt={`${name} logo`} loading="lazy" />
        </a>
      ))}
    </div>
  );
}
