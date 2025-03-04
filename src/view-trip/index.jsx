import {doc, getDoc} from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';
import InfoSection from './components/InfoSection';

function Viewtrip() {

  const {tripId} = useParams();
  const [trip, setTripData] = useState([null]);

  useEffect(()=>{
    if (tripId) {
      GetTripData();
    }
  },[tripId]);


  /**
   * used to get trip info from firebase
   */
  const GetTripData=async()=>{
    try{
    const docRef = doc(db,'AITrips',tripId)
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log('Document :',docSnap.data());
      setTripData(docSnap.data());
  }
  else{
    console.log('No such document');
    toast('No trip found!')
  }
  } catch(error){
    console.error('Error fetching trip data:',error);
    toast('Failed to fetch trip data. Please try again.');
  }


  };
  
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    { /* Information Section*/}
         <InfoSection trip={trip} />
    {/*Recommended Hotels*/}

    {/**daily plan */}

    {/**footer */}
    </div>
  )
}

export default Viewtrip