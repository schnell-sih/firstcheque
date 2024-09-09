import Link from "next/link";
import React from "react";

interface CardWithButtonProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const CardWithButton = ({
  title,
  description,
  imageUrl,
  href,
}: CardWithButtonProps) => {
  return (
    <div className="relative rounded-lg border border-black w-60 h-60 p-4 shadow-2xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: "brightness(0.25)",
        }}
      />
      <div className="relative z-10 text-white">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-md mt-1">{description}</p>
      </div>
      <Link href={href} className="absolute bottom-4 right-4">
        <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default CardWithButton;
