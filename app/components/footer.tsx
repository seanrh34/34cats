"use client";

import { asset, site } from "../data";
import { Clock } from "./clock";
import { DownloadIcon, socialIcon } from "./icons";
import { useToast } from "./toast";

export function Footer() {
  const toast = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast({ title: "email copied — purr", detail: site.email });
    } catch {
      toast({ title: "couldn't copy", detail: site.email });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-wordmark-wrap" aria-hidden="true">
        <span className="footer-wordmark">34cats</span>
      </div>
      <p className="sr-only">34cats</p>

      <div className="footer-contact">
        <div className="footer-contact-block">
          <p className="footer-label">Email</p>
          <div className="footer-email-row">
            <button type="button" className="footer-email" onClick={copyEmail} data-cursor="copy">
              <span className="footer-email-text">{site.email}</span>
              <span className="footer-email-hint">click to copy</span>
            </button>
            <a className="footer-mailto" href={`mailto:${site.email}`}>
              Email me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="footer-contact-block">
          <p className="footer-label">Elsewhere</p>
          <ul className="footer-socials" aria-label="Find me online">
            {site.socials.map((social) => {
              const Icon = socialIcon(social.label);
              return (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <Icon width={14} height={14} />
                    <span>{social.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer-contact-block">
          <p className="footer-label">Résumé</p>
          <a className="footer-resume" href={asset(site.resumePath)} download>
            <DownloadIcon width={15} height={15} />
            Résumé (PDF)
          </a>
        </div>
      </div>

      <div className="footer-row">
        <p className="footer-copy">
          © {new Date().getFullYear()} Sean Richardson Hardjanto · built like a night shift
        </p>
        <p className="footer-clock">
          SGT <Clock className="mono-time" />
        </p>
        <a className="footer-top" href="#top">
          back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
