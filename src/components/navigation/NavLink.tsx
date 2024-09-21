"use client";
import React from "react";
import Link from "next/link";
import {
  withAuthOptionsFreelancer,
  withAuthOptionsEmployer,
  withoutAuthOptions,
} from "@/data/NavList";
import { User } from "@supabase/supabase-js";

interface NavLinkProps {
  user: User | null;
  role: string;
}

const NavLink = ({ user, role }: NavLinkProps) => {
  return (
    <nav>
      <ul className="flex-1 flex justify-center">
        {user
          ? role === "freelancer"
            ? withAuthOptionsFreelancer.map((option, index) => (
                <li key={index}>
                  <Link
                    href={option.route}
                    className="rounded-lg hover:bg-slate-200 text-lg py-2 px-4 md:bg-transparent font-semibold"
                  >
                    {option.title}
                  </Link>
                </li>
              ))
            : withAuthOptionsEmployer.map((option, index) => (
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
