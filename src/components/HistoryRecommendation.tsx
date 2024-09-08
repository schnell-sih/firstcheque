import React from 'react'

const HistoryRecommendations = () => {
  return (
    <div className='p'>
       <h1 className='mb-8 text-2xl pl-2 text-left font-semibold'>History Recommendations </h1>
       <div className=" grid grid-cols-3 gap-2">  
    <div className="max-w-xs w-full group/card ">
      <div
        className=
          "bg-white bg-cover cursor-pointer border border-stone-900 overflow-hidden relative card h-48 rounded-xl shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4">
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-stone-400 opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
         
          
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-stone-800 relative z-10">
            Job Title 
          </h1>
          <p className="font-normal text-sm text-stone-800 relative z-10 my-4">
            Card with Author avatar, complete name and time to read - most
            suitable for blogs.
          </p>
          <div className='text-sm text-stone-800 flex justify-between'> <p>Skills required : ... </p> <p>Employer name </p></div>
        </div>
      </div>
    </div>
    </div>

    <div className="max-w-xs w-full group/card ">
      <div
        className=
          "bg-white bg-cover cursor-pointer border border-stone-900 overflow-hidden relative card h-48 rounded-xl shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4">
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-stone-400 opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
         
          
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-stone-800 relative z-10">
            Job Title 
          </h1>
          <p className="font-normal text-sm text-stone-800 relative z-10 my-4">
            Card with Author avatar, complete name and time to read - most
            suitable for blogs.
          </p>
          <div className='text-sm text-stone-800 flex justify-between'> <p>Skills required : ... </p> <p>Employer name </p></div>
        </div>
      </div>
    </div>
    </div>

    <div className="max-w-xs w-full group/card ">
      <div
        className=
          "bg-white bg-cover cursor-pointer border border-stone-900 overflow-hidden relative card h-48 rounded-xl shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4">
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-stone-400 opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
         
          
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-stone-800 relative z-10">
            Job Title 
          </h1>
          <p className="font-normal text-sm text-stone-800 relative z-10 my-4">
            Card with Author avatar, complete name and time to read - most
            suitable for blogs.
          </p>
          <div className='text-sm text-stone-800 flex justify-between'> <p>Skills required : ... </p> <p>Employer name </p></div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default HistoryRecommendations;