import React from 'react';

const ActiveJob = () => {
  return (
    <div className='pt-28 text-stone-900'>
      <h1 className="text-4xl text-center font-semibold mb-4">Your Activity</h1>
      <p className="text-center text-stone-900 mb-16">Keep up with your projects.</p>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <div className="w-full group">
          <div className="cursor-pointer border-2 border-spacing-4 border-stone-900 overflow-hidden relative h-48 rounded-xl shadow-xl mx-auto bg-white bg-cover flex flex-col justify-between p-6">
            <div className="absolute w-full h-full top-0 left-0 opacity-60"></div>
            <div className="flex flex-row items-center space-x-4 z-10">
              <div className="text-content w-full">
                <h1 className="font-bold text-xl md:text-2xl text-stone-800 relative z-10">Ongoing Job Title</h1>
                <p className="font-normal text-sm text-stone-800 relative z-10 my-4">
                  Card with Author avatar, complete name and time to read - most suitable for blogs.
                </p>
                <div className='text-sm text-stone-800 flex justify-between'>
                  <p>Skills required: ...</p>
                  <p className='ml-auto text-right'>Employer name</p> {/* Added ml-auto */}
                </div>
              </div>     
            </div>   
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveJob;
