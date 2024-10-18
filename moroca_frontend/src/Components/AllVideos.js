import React from 'react';
import '../css/Login.css'
import {FaCalendarAlt} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom';
import {BsFillPlayFill} from 'react-icons/bs'
import Footer from './Footer';

const AllVideos = ({ videos,service ,ani,mid,count}) => {
console.log("srevice",service)
const navigate=useNavigate()

  const handleClick = (id) => {
    if (count == '1') {
      navigate(`/video/${id}/${service}/${mid}`);
    } else {
navigate('/')
        // window.open('http://optin.telkomsdp.co.za/service/150?cid=700012', '_blank');
    }
  }

  
  return (
    <>
    
    


<div class="grid grid-cols-1 mt-5 font-family md:mt-10 md:p-10 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {videos.map((vid) => {
    const apiDate = new Date(vid.datetime);
    
    // Define the months in an array for conversion
    const months = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    
    // Get the day, month, and year from the Date object
    const day = apiDate.getDate();
    const month = months[apiDate.getMonth()];
    const year = apiDate.getFullYear();
    
    // Format the date in the desired format (e.g., "12 JULY, 2021")
    const formattedDate = `${day} ${month}, ${year}`;

    return (
      <div
      onClick={()=>handleClick(vid.videoid)} 
        key={vid.id}
        class=" bg-white border hover:scale-105 border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200"
      >
    
          <img class="rounded-t-lg w-full h-[250px] md:h-[200px] object-cover object-top" src={vid.imgurl} alt="" />
   
     <div className='flex justify-center mt-[-20px]'>
     <button className=' bg-white container  bg-opacity-70  w-10 h-10 rounded-full'>
     <BsFillPlayFill className='mx-auto' size={25} color='black'/>

     </button>
      </div>
    

        <div class="px-5 py-2 ">
       
            <h5 class=" text-xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              {vid.video_name}
            </h5>
          
          <p class="mb-3 flex gap-1    text-gray-700  dark:text-gray-700">
         <FaCalendarAlt className='mt-1'/>  {formattedDate}
          </p>
        </div>
      </div>
    );
  })}
</div>





    </>
    

  );
};

export default AllVideos;