import { useState } from 'react';
import HoverHeading from "../components/HoverHeading";
import { sectionWrapper } from "../constants";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="faq" className="border border-secondary rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-secondary/10 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-text pr-4">{question}</span>
        <span className="text-2xl text-accent flex-shrink-0 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 py-4 text-text-secondary border-t border-secondary/50 bg-secondary/5">
          {answer}
        </div>
      </div>
    </section>
  );
}

// Sample FAQ data - replace with actual content later
const faqData = [
  {
    question: "Why is the domain of this website called 34cats?",
    answer: "I currently have no plans to start a company or brand but if I did, I would name it 34cats. So I decided to use that domain for my personal website to get the domain early and maybe build some domain authority over time."
  },
  {
    question: "What kind of roles are you open to?",
    answer: "I'm most familiar with fullstack development, particularly in integrating various technologies and frameworks. However, I'm open to exploring other roles as I grow and learn."
  },
  {
    question: "What is your availability?",
    answer: "I am currently a full time student so I am open to part-time opportunities throughout the semesters and full time during the summer break (May-August)."
  },
  {
    question: "What technologies do you work with?",
    answer: "I primarily work with JavaScript and TypeScript, utilizing frameworks like React and Node.js. I'm also familiar with Python and Java, and have knowledge of database management systems like PostgreSQL and MongoDB."
  },
  {    
    question: "What do you enjoy the most out of programming and app development?",
    answer: "I enjoy the problem-solving aspect of programming the most. Not only in the technical challenges but also non-technical problems such as design and user experience."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className={`${sectionWrapper} scroll-mt-24 min-h-screen border-none relative`}>
      <div className="text-center mb-12 md:mb-24">
        <h2 className="text-text text-4xl font-bold md:hidden">FAQ</h2>
        <div className="hidden md:block">
          <HoverHeading title="FAQ" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
