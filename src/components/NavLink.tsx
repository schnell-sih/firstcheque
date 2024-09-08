"use client";
import React from "react";
import Link from "next/link";
import { withAuthOptions, withoutAuthOptions } from "@/data/NavList";
const NavLink = () => {
  let user = true;
  return (
    <nav>
      <ul className="flex space-x-4">
        {user != null
          ? withAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="py-2 px-3 text-zinc-800 hover:text-black rounded md:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {option.title}
                </Link>
              </li>
            ))
          : withoutAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="py-2 px-3 text-zinc-800 hover:text-black rounded md:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
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
