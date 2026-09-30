import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function ArrowRight({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}

export function ArrowLeft({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>;
}

export function Check({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m5 12 4 4L19 6"/></svg>;
}

export function Quote({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M8 9H5a2 2 0 0 0-2 2v4h5v-4H5"/><path d="M19 9h-3a2 2 0 0 0-2 2v4h5v-4h-3"/></svg>;
}

export function Clock({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

export function X({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m6 6 12 12"/><path d="m18 6-12 12"/></svg>;
}

export function Spark({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m18.5 15 .7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/></svg>;
}

export function Evidence({ size = 16, ...props }: IconProps) {
  return <svg {...base(size)} {...props}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z"/><path d="M8 8h6"/><path d="M8 12h7"/><path d="M8 16h4"/></svg>;
}
