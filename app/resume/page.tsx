import type { Metadata } from "next";
import Link from "next/link";
import { basePath } from "../data";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Sean Richardson Hardjanto, a Singapore-based product and full-stack engineer.",
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-header">
        <Link className="wordmark" href="/"><span className="wordmark-dot" /> SH</Link>
        <Link href="/">← Back to portfolio</Link>
        <a className="button button-primary" href={`${basePath}/seanhardjanto_resume.pdf`} download>Download PDF ↓</a>
      </header>
      <section className="resume-intro">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>Sean Richardson Hardjanto</h1>
        <p>Product-minded full-stack engineer · Singapore</p>
      </section>
      <div className="resume-frame">
        <object data={`${basePath}/seanhardjanto_resume.pdf`} type="application/pdf">
          <p>Your browser cannot display the PDF. <a href={`${basePath}/seanhardjanto_resume.pdf`}>Download Sean&apos;s résumé instead.</a></p>
        </object>
      </div>
    </main>
  );
}
