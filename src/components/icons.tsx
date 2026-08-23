import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({
  size = 20,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icon>
);
export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 21c.6-4 3-6 7-6s6.4 2 7 6" />
  </Icon>
);
export const UserAddIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10" cy="8" r="3.5" />
    <path d="M3 21c.6-4 3-6 7-6 2 0 3.7.5 4.9 1.5M18.5 7v6M15.5 10h6" />
  </Icon>
);
export const BagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 8h14l-1 13H6L5 8Z" />
    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
  </Icon>
);
export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 7h18M3 17h18" />
  </Icon>
);
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </Icon>
);
export const ArrowIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      d="M5 12h14M13 6l6 6-6 6"
      fill="none"
      stroke="#283455"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  </Icon>
);
export const LiveIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
    <path d="M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8" />
  </Icon>
);
export const MoreIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
  </Icon>
);
export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M5 21h14" />
  </Icon>
);
export const ViewIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
);
export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);
export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
  </Icon>
);
export const TagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 4h7l9 9-7 7-9-9V4Z" />
    <circle cx="8.5" cy="8.5" r="1" />
  </Icon>
);
export const CareIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <path d="M4 12h2v6H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2ZM20 12h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2ZM18 18c0 2-1.5 3-4 3" />
  </Icon>
);
export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);
export const ChevronIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      d="M9 5l7 7-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v11h14V10M9 21v-7h6v7" />
  </Icon>
);
export const ShopIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10h16l-1 11H5L4 10Z" />
    <path d="m3 10 2-6h14l2 6M8 10v1a2 2 0 0 0 4 0v-1M12 10v1a2 2 0 0 0 4 0v-1" />
  </Icon>
);
export const BedIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 19v-8M21 19v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3M3 16h18" />
    <path d="M7 11V8H3v8" />
  </Icon>
);
