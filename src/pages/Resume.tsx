import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Resume() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section id="resume" className="min-h-screen bg-secondary text-text px-4 py-20">
      <div className="max-w-5xl items-center text-center mx-auto">
        <h2 className="text-3xl font-heading text-accent mb-6">Resume</h2>
        
        <div className="flex flex-col items-center" ref={containerRef}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 w-full">
            <Document
              file="/seanhardjanto_resume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
            >
              <Page 
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                width={pageWidth || undefined}
                className="max-w-full"
              />
            </Document>
          </div>

          {numPages > 1 && (
            <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
              <button
                onClick={() => setPageNumber(page => Math.max(1, page - 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-background outline-offset-[-3px] rounded-md cursor-pointer transition-all duration-400 border-background border-[2px] hover:bg-text text-text hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-text"
              >
                Previous
              </button>
              <p className="text-text text-sm sm:text-base">
                Page {pageNumber} of {numPages}
              </p>
              <button
                onClick={() => setPageNumber(page => Math.min(numPages, page + 1))}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-background outline-offset-[-3px] rounded-md cursor-pointer transition-all duration-400 border-background border-[2px] hover:bg-text text-text hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-text"
              >
                Next
              </button>
            </div>
          )}

          <a
            href="/seanhardjanto_resume.pdf"
            download
            className="relative group inline-flex items-center gap-1 px-10 py-4 mt-6 border-[4px] border-transparent font-semibold text-[16px] bg-inherit rounded-full text-text shadow-[0_0_0_2px] shadow-accent cursor-pointer overflow-hidden transition-all duration-[50ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 hover:shadow-[0_0_0_12px_transparent]"
          >
            <svg
              viewBox="0 0 24 24"
              className="arr-2 absolute left-[-25%] w-6 fill-accent z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-secondary"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>

            <span className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"></span>

            <span className="relative z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] -translate-x-3 group-hover:translate-x-3 group-hover:text-secondary">
              Download Resume
            </span>

            <svg
              viewBox="0 0 24 24"
              className="arr-1 absolute right-4 w-6 fill-accent z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-secondary"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}