import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Hero() {
  return (

    <div className="relative w-full h-[100vh] overflow-hidden">
     {/* Background video */}
     <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/beach.mp4" // ✅ Replace with your video path
        autoPlay
        muted
        loop
        playsInline
      />
       {/* Overlay for darkening (optional) */}
       <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />


       <div className="relative z-20 flex flex-col items-center justify-center h-full mx-5 md:mx-40 gap-9 text-white text-center">
      <h1 className='font-extrabold text-[40px] text-center mt-16'>
      <span className='text-[#77173f]'>Plan Smarter, Travel Better</span><br /> AI-Powered Itineraries, Just for You
      </h1>
      <p className='text-xl text-black-500 text-center'>Let AI handle the planning! Get personalized itineraries tailored to your interests, budget, and travel style—seamlessly and stress-free.</p>
       

       <Link to={'/create-trip'}>
       <Button> Generate Your Itinerary </Button>
       </Link>
       
      </div>
      </div>
  );
}

export default Hero