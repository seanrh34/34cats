import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Sitting cat silhouette - the 34cats mark. */
export function CatSilhouette(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.2 12.8 7.6 4l4.3 3.4a9.7 9.7 0 0 1 8.2 0L24.4 4l.4 8.8a10.6 10.6 0 0 1 2 6.2c0 6.6-4.9 11.4-10.8 11.4S5.2 25.6 5.2 19c0-2.3.8-4.4 2-6.2Z" />
      <circle cx="12.4" cy="15.4" r="1.1" fill="var(--bg)" />
      <circle cx="19.6" cy="15.4" r="1.1" fill="var(--bg)" />
    </svg>
  );
}

/** Cat paw - used for confetti + toast icons. */
export function Paw(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="16.2" rx="4.6" ry="3.9" />
      <circle cx="5.6" cy="10.6" r="2" />
      <circle cx="9.5" cy="7.4" r="2" />
      <circle cx="14.5" cy="7.4" r="2" />
      <circle cx="18.4" cy="10.6" r="2" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.3 13.6A8.9 8.9 0 1 1 10.4 2.7a7 7 0 0 0 10.9 10.9Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 8.5h16M4 15.5h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** GitHub - the cat, naturally. */
export function GithubIcon(props: IconProps) {
  return <CatSilhouette {...props} />;
}

/** LinkedIn - abstract "in" plate. */
export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M8 11.5V17M11.5 17v-3.2c0-1.3 1-2.3 2.2-2.3s2.3 1 2.3 2.3V17" strokeLinecap="round" />
    </svg>
  );
}

/** LeetCode - terminal prompt. */
export function LeetcodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="4" />
      <path d="m8.5 9.5-2 2.5 2 2.5M15.5 9.5l-2 2.5 2 2.5" />
    </svg>
  );
}

/** Blog - open book. */
export function BlogIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 6.5C10.5 5 8 4.5 5 4.7v12.8c3-.2 5.5.3 7 1.8 1.5-1.5 4-2 7-1.8V4.7c-3-.2-5.5.3-7 1.8Z" />
      <path d="M12 6.5v12.8" />
    </svg>
  );
}

/** Apps - app grid. */
export function AppsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="2.2" />
      <rect x="13" y="4" width="7" height="7" rx="2.2" />
      <rect x="4" y="13" width="7" height="7" rx="2.2" />
      <rect x="13" y="13" width="7" height="7" rx="2.2" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 19.5v-15M6 10.5l6-6 6 6" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export function socialIcon(label: string) {
  switch (label) {
    case "GitHub":
      return GithubIcon;
    case "LinkedIn":
      return LinkedinIcon;
    case "LeetCode":
      return LeetcodeIcon;
    case "Blog":
      return BlogIcon;
    case "Apps":
      return AppsIcon;
    default:
      return AppsIcon;
  }
}
