import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigation=useNavigation();
    const [userTrips,setUserTrips] = useState([]);
    useEffect(() =>{
        GetUserTrips();
    },[])
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigation('/');
            return ;
        }
        setUserTrips([]); 
        const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev=>[...prev,doc.data()])
    });
    }
   
  return (
   <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
    <h2 className='font-bold text-3xl'>My Trip</h2>
   </div>
  )
}

export default MyTrips