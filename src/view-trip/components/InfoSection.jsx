import { Button } from '@/components/ui/button';
import { GetPlacesDetails } from '@/service/GlobalApi';
import React, { useEffect } from 'react';
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {

    useEffect(() => {
       trip && GetPlacePhoto();
    }, [trip])

   const GetPlacePhoto=async()=>{

    const data={
        textQuery:trip.userSelection.destination
    }
      const result=await GetPlacesDetails().then(resp=>{
        console.log(resp.data)
      })
   }

    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>;
    }
  return (
    <div>
        <img src="/placeholder.jpg" className='h-[340px] w-full object-cover rounded-xl' />
    <div className='flex justify-between items-center'>

    <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip.userSelection.destination}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection.days} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 Budget: {trip.userSelection.budget} </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 Traveling with: {trip.userSelection.travelWith}</h2>

        </div>
    </div>
    <Button><IoIosSend /></Button>
</div>

    </div>
  )
}

export default InfoSection