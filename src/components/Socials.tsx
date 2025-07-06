import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-8 text-3xl text-text">
      <a
        href="https://github.com/seanrh34"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/sean-hardjanto-0b8874139/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://leetcode.com/seanrh34"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        <SiLeetcode />
      </a>
    </div>
  );
}
