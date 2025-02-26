import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-40 gap-9'>
      <h1 className='font-extrabold text-[40px] text-center mt-16'>
      <span className='text-[#A35C7A]'>Plan Smarter, Travel Better</span><br /> AI-Powered Itineraries, Just for You
      </h1>
      <p className='text-xl text-gray-500 text-center'>Let AI handle the planning! Get personalized itineraries tailored to your interests, budget, and travel style—seamlessly and stress-free.</p>
       

       <Link to={'/create-trip'}>
       <Button> Generate Your Itinerary </Button>
       </Link>
       
      </div>
  )
}

export default Hero