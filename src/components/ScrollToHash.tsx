import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Add scroll margin if needed to offset navbar
        const yOffset = -80; // adjust based on your navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}