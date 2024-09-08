import React from "react";

const LoginButton = () => {
  return (
    <div className="w-44 flex justify-end">
      <button className="relative w-[50%] hover:shadow-md hover:shadow-zinc-500 transition-shadow duration-300 ease-in-out group/btn block bg-black text-white rounded-lg h-10 font-medium px-6 py-2 ">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
