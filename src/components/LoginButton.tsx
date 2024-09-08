import React from 'react'

const LoginButton = () => {
  return (
    <div className= 'w-44 flex justify-end'>
        <button className="relative w-[50%] hover:shadow-md hover:shadow-zinc-500 transition-shadow duration-300 ease-in-out group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 block  text-white rounded-lg h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] px-6 py-2 ">
        Login
        </button>
    </div>
  )
}

export default LoginButton;