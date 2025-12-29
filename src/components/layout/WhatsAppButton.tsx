
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.31 3.4 16.78L2.05 22L7.31 20.65C8.72 21.41 10.32 21.88 12.04 21.88C17.5 21.88 21.95 17.43 21.95 11.97C21.95 6.51 17.5 2 12.04 2ZM12.04 20.13C10.49 20.13 9.03 19.71 7.82 19L7.43 18.78L4.53 19.53L5.3 16.7L5.06 16.3C4.18 15 3.82 13.47 3.82 11.91C3.82 7.41 7.52 3.71 12.04 3.71C16.56 3.71 20.26 7.41 20.26 11.97C20.26 16.53 16.56 20.13 12.04 20.13ZM16.56 14.44C16.33 14.32 15.14 13.78 14.92 13.69C14.71 13.61 14.54 13.57 14.38 13.8C14.22 14.03 13.78 14.57 13.66 14.73C13.54 14.89 13.42 14.91 13.19 14.8C12.96 14.68 12.13 14.4 11.13 13.52C10.35 12.82 9.83 12.01 9.65 11.75C9.47 11.49 9.58 11.36 9.7 11.24C9.81 11.12 9.96 10.95 10.09 10.8C10.22 10.65 10.27 10.54 10.35 10.38C10.43 10.22 10.39 10.09 10.33 9.98C10.27 9.86 9.79 8.68 9.59 8.19C9.39 7.71 9.19 7.77 9.05 7.77C8.91 7.77 8.75 7.77 8.58 7.77C8.42 7.77 8.14 7.85 7.92 8.08C7.7 8.31 7.16 8.78 7.16 9.9C7.16 11.02 7.94 12.11 8.06 12.27C8.18 12.43 9.81 14.94 12.25 15.92C14.69 16.9 14.69 16.52 15.25 16.46C15.81 16.4 16.79 15.84 17 15.51C17.21 15.18 17.21 14.92 17.15 14.8C17.09 14.68 16.79 14.56 16.56 14.44Z"
    />
  </svg>
);


export default function WhatsAppButton() {
  // Replace with your actual WhatsApp number including country code without '+' or '00'
  const phoneNumber = "917979784087"; 
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "w-14 h-14 rounded-full bg-green-500 text-white",
        "flex items-center justify-center shadow-lg",
        "hover:bg-green-600 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      )}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
}
