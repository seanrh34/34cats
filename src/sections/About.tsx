import { useEffect, useState } from 'react';

// Components
import AboutCard from "../components/AboutSection/AboutCard";
import ProfilePicture from "../components/AboutSection/ProfilePicture";
import HoverHeading from "../components/HoverHeading";
import MiniNavbar from "../components/AboutSection/MiniNavbar";


// Constants and assets
import { sectionWrapper } from "../constants";
import { experienceData, educationData } from '../assets/profileData';
import sean_photo from '/images/sean_photo_resized.jpg';
import { ExperienceGroup } from '../components/AboutSection/ExperienceCard';
import { EducationGroup } from '../components/AboutSection/EducationCard';

export default function About() {
  const [content, setContent] = useState('');
  const [activeId, setActiveId] = useState('bio');
  const [visibleId, setVisibleId] = useState('bio');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    fetch('/text/about.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  useEffect(() => {
    if (activeId === visibleId) return;

    setIsFadingOut(true);

    const timeout = setTimeout(() => {
      setVisibleId(activeId);
      setIsFadingOut(false);
    }, 200); // matches fade-out duration

    return () => clearTimeout(timeout);
  }, [activeId]);

  return (
    <section id="about" className={`${sectionWrapper} scroll-mt-24 min-h-screen border-none relative`}>
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 transform scale-y-[-1] animate-pulse-slow fixed-background-glow pointer-events-none" />
      <div className="text-center md:mb-24">
        <h2 className="text-text text-4xl font-bold md:hidden">About Me</h2>
        <div className="hidden md:block">
          <HoverHeading title="About Me" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-4 items-start md:items-center">
        <div className="flex flex-col md:ml-24 xl:ml-96">
          <div className="relative aspect-[3/4] sm:aspect-square rounded-[20px] shadow-2xl group">
            <ProfilePicture imageUrl={sean_photo} />
          </div>

          <div className="hidden md:flex flex-col pl-36 xl:pl-72">
            <MiniNavbar activeId={activeId} setActiveId={setActiveId} />
          </div>
        </div>

        <div
          className={`hidden md:block relative justify-center xl:mr-96 transition-all duration-300`}
          style={{ opacity: isFadingOut ? 0 : 1 }}
        >
          {visibleId === 'bio' && (
            <AboutCard
              name="Sean Richardson Hardjanto"
              email="seanhardjanto034@gmail.com"
              nationality="Singapore Citizen"
              status="Available for Opportunities"
              bio={content}
            />
          )}
          {visibleId === 'education' && (
            <div className="text-white text-xl p-4">
              <div className="px-4 md:px-12">
                <EducationGroup expCards={educationData} />
              </div>
            </div>
          )}
          {visibleId === 'experience' && (
            <div className="text-white text-xl p-4">
              <div className="px-4 md:px-12">
                <ExperienceGroup cards={experienceData} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SM-only: stacked display for mobile devices */}
      <div className="block md:hidden space-y-6 -mt-24">
        <div className='flex flex-col items-center'>
          <AboutCard
            name="Sean Richardson Hardjanto"
            email="seanhardjanto034@gmail.com"
            nationality="Singapore Citizen"
            status="Available for Opportunities"
            bio={content}
          />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className="text-text text-3xl font-bold mb-4">Education</h2>
          <EducationGroup expCards={educationData} />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className="text-text text-3xl font-bold mb-4">Experience</h2>
          <ExperienceGroup cards={experienceData} />
        </div>
      </div>
    </section>
  );
}