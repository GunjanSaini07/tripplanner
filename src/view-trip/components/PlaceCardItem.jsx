import { Button } from '@/components/ui/button'
import React from 'react'

function PlaceCardItem({place}) {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src="/placeholder.jpg" 
        className='w-[130px] h-[130px] rounded-xl object-cover'
        />
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
           
           <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          
           {place.travelTimeFromPrevious ? (
          <h2 className='font-bold text-sm mt-2'>🕙 {place.travelTimeFromPrevious}</h2>
        ) : place.travelTimeFromHotel ? (
          <h2 className='font-bold text-sm mt-2'>🕙 {place.travelTimeFromHotel}</h2>
        ) : null}
        
        </div>
    </div>
  )
}

export default PlaceCardItem