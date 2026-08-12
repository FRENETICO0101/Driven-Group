import type { ReactNode } from "react";

interface IconProps {
  name: string;
  className?: string;
  label?: string;
}

const iconPaths: Record<string, ReactNode> = {
  arrow_forward: <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></>,
  arrow_back: <><path d="M20 12H4" /><path d="m10 6-6 6 6 6" /></>,
  arrow_outward: <><path d="M6 18 18 6" /><path d="M9 6h9v9" /></>,
  north_east: <><path d="M6 18 18 6" /><path d="M9 6h9v9" /></>,
  open_in_new: <><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" /></>,
  open_in_full: <><path d="M8 3H3v5" /><path d="m3 3 6 6" /><path d="M16 21h5v-5" /><path d="m21 21-6-6" /><path d="M21 8V3h-5" /><path d="m21 3-6 6" /><path d="M3 16v5h5" /><path d="m3 21 6-6" /></>,
  fullscreen: <><path d="M8 3H3v5" /><path d="M16 3h5v5" /><path d="M3 16v5h5" /><path d="M21 16v5h-5" /></>,
  close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  chevron_left: <path d="m15 18-6-6 6-6" />,
  chevron_right: <path d="m9 18 6-6-6-6" />,
  phone: <path d="M6.6 3.8 9.1 3a1.6 1.6 0 0 1 1.9.8l1.1 2.6a1.6 1.6 0 0 1-.4 1.8l-1.4 1.1a13 13 0 0 0 4.4 4.4l1.1-1.4a1.6 1.6 0 0 1 1.8-.4l2.6 1.1a1.6 1.6 0 0 1 .8 1.9l-.8 2.5a2 2 0 0 1-2 1.4C10.1 19.8 4.2 13.9 4.2 5.8a2 2 0 0 1 1.4-2Z" />,
  person: <><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
  light_mode: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  dark_mode: <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />,
  tune: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
  trending_up: <><path d="m4 16 6-6 4 4 6-7" /><path d="M16 7h4v4" /></>,
  check_circle: <><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.3 4.8-5" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  location_on: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
  visibility: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.8" /></>,
  favorite: <path d="M20.4 5.6a5.1 5.1 0 0 0-7.2 0L12 6.8l-1.2-1.2a5.1 5.1 0 0 0-7.2 7.2L12 21l8.4-8.2a5.1 5.1 0 0 0 0-7.2Z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  photo_camera: <><path d="M4 8h3l1.3-2h7.4L17 8h3a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 8Z" /><circle cx="12" cy="13" r="3.2" /></>,
  play_circle: <><circle cx="12" cy="12" r="8.5" /><path d="m10 8 5 4-5 4Z" fill="currentColor" stroke="none" /></>,
  business: <><path d="M4 20V8h16v12" /><path d="M9 8V5h6v3M2 20h20M9 12h1M14 12h1M9 16h1M14 16h1" /></>,
  apartment: <><path d="M5 21V4h10v17M15 9h4v12M2 21h20" /><path d="M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1" /></>,
  architecture: <><path d="M4 20h16M6 20v-6l6-4 6 4v6M9 20v-4h6v4M4 9h16" /><path d="M7 6h10" /></>,
  article: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  picture_as_pdf: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M8 16h8M8 13h5" /></>,
  search_off: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m4 4 16 16M15 15l4 4" /></>,
};

export function Icon({ name, className = "", label }: IconProps) {
  const path = iconPaths[name] ?? <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M8 12h8M12 8v8" /></>;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`inline-block shrink-0 ${className}`} role={label ? "img" : undefined} aria-hidden={label ? undefined : true} aria-label={label}>
      {path}
    </svg>
  );
}
