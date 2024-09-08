"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = () => {
    const router = useRouter();
    const user = true;
    if (!user) return null; // Return null if user is null or undefined

    return (
        <footer className="w-full  bg-stone-900 text-white py-10 px-6">
            <div className="flex flex-col mb-12 md:flex-row justify-between gap-8">
                <div className="w-full md:w-1/2 ml-8">
                    <div className="flex items-center gap-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                            />
                        </svg>
                        <p className="text-xl font-semibold">FirstCheque</p>
                    </div>
                    <p className="text-sm font-light">
                        We connect you to the jobs that fit your skills and passion.
                        <br />
                        Your journey to a better career starts here.
                    </p>
                </div>
                {/* Div container aligned to the right but text aligned left */}
                <div className="w-full md:w-1/2 flex flex-col items-end pr-8">
                    <div className="text-left"> {/* Ensures text inside is aligned left */}
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="text-xs space-y-1">
                            <li onClick={() => router.push('/dashboard')} className="cursor-pointer">Dashboard</li>
                            <li onClick={() => router.push('/discover')} className="cursor-pointer">Discover</li>
                            <li onClick={() => router.push('/chatbot')} className="cursor-pointer">AI-Chatbot</li>
                            <li onClick={() => router.push('/profile')} className="cursor-pointer">Profile</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="border-t border-white my-6 mx-4" />
            <p className="text-xs text-center">
                &copy; {new Date().getFullYear()} FirstCheque. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
