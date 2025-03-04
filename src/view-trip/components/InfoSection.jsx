import React from 'react'

function InfoSection({trip}) {
    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>;
    }
  return (
    <div>
        <img src="/placeholder.jpeg" className='h-[340px] w-full object-cover rounded-xl' />
    
    <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip.userSelection.destination}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>{trip.userSelection.days} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>Budget: {trip.userSelection.budget} </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>Traveling with: {trip.userSelection.travelWith}</h2>

        </div>
    </div>
    </div>
  )
}

export default InfoSection