import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([day, details], index) => (
            <div key={index} className='mt-5' >
              <h2 className='font-medium text-lg'>{day.toUpperCase()}</h2>


                <div className=' grid md:grid-cols-2 gap-5 w-full'>
              {details.places?.map((place, i) => (
                <div key={i} className=" my-4">
                
                  <h3 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h3>
                
                 <PlaceCardItem place={place} />
                  
                </div>
              ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
