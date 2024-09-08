"use client";
import React from "react";
import Link from "next/link";
import { withAuthOptions, withoutAuthOptions } from "@/data/NavList";

const NavLink = () => {
  const user = true;

  return (
    <nav>
      <ul className="flex space-x-4">
        {user != null
          ? withAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="rounded hover:bg-slate-200 text-lg p-2 md:bg-transparent font-semibold"
                >
                  {option.title}
                </Link>
              </li>
            ))
          : withoutAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="py-2 px-3 hover:text-black rounded md:bg-transparent md:p-0"
                >
                  {option.title}
                </Link>
              </li>
            ))}
      </ul>
    </nav>
  );
};
export default NavLink;
