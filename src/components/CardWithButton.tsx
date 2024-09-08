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
  fontColor,
}: CardWithButtonProps) => {
  return (
    <div
      className={`rounded-lg border-2 border-black w-60 h-60 p-3 relative block bg-cover bg-center overflow-hidden bg-opacity-5 text-${fontColor}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="text-md font-extrabold">{description}</p>
      {/* <img
        src={imageUrl}
        alt={title}
        className="rounded-lg border-2 border-black w-60 h-60 p-3 relative block bg-cover bg-center"
      /> */}
      <Link href={href} className="absolute bottom-4 right-4">
        <div className="rounded-full bg-black color-white w-12 h-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
