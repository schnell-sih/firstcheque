"use client";
import React from "react";
import Link from "next/link";
import { withAuthOptions, withoutAuthOptions } from "@/data/NavList";
import { User } from "@supabase/supabase-js";

interface NavLinkProps {
  user: User | null;
}

const NavLink = ({ user }: NavLinkProps) => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {user
          ? withAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="rounded-lg hover:bg-slate-200 text-lg py-2 px-4 md:bg-transparent font-semibold"
                >
                  {option.title}
                </Link>
              </li>
            ))
          : withoutAuthOptions.map((option, index) => (
              <li key={index}>
                <Link
                  href={option.route}
                  className="rounded-lg hover:bg-slate-200 text-lg py-2 px-4 md:bg-transparent font-semibold"
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
