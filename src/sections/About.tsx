import { useEffect, useState } from 'react';

// Components
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
import ProfilePicture from "../components/ProfilePicture";
import HoverHeading from "../components/HoverHeading";
import MiniNavbar from "../components/MiniNavbar";


// Constants and assets
import { sectionWrapper } from "../constants";
import sean_photo from "../assets/images/sean_photo.jpg";

export default function About() {
  const [content, setContent] = useState('');
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    fetch('/src/assets/text/about.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <section id="about" className={`${sectionWrapper} scroll-mt-24 min-h-screen`}>
      <div className="text-center md:mb-24">
        {/* Shown on small screens */}
        <h2 className="text-white text-4xl font-bold md:hidden">About Me</h2>

        {/* Shown on md and up */}
        <div className="hidden md:block">
          <HoverHeading title="About Me" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-8 md:mt-8">
        <div className="flex flex-col px-8">
          <div className="p-16">
            <ProfilePicture imageUrl={sean_photo} />
          </div>
          <div className="flex flex-col pl-36">
            <MiniNavbar activeId={activeId} setActiveId={setActiveId} />
          </div>
        </div>
        <div className="justify-center">
          {activeId === 'about' && (
            <Card1
              name="Sean Richardson Hardjanto"
              email="seanhardjanto034@gmail.com"
              nationality="Singapore Citizen"
              status="Available for Opportunities"
              about={content}
            />
          )}

          {activeId === 'experience' && (
            <div className="text-white text-xl p-4"> {/* Replace with real content */}
              Experience section goes here.
            </div>
          )}

          {activeId === 'projects' && (
            <div className="text-white text-xl p-4"> {/* Replace with real content */}
              Projects section goes here.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
