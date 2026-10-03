"use client";

import { Clock } from "./clock";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wordmark-wrap" aria-hidden="true">
        <span className="footer-wordmark">34cats</span>
      </div>
      <p className="sr-only">34cats</p>
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
