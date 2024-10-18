import React, { useEffect, useState } from 'react';
import logo from '../../assets/ttlogo.png'
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import {ImCross} from 'react-icons/im'
import './Tt.css'
import { FaCaretDown } from 'react-icons/fa';
import logo2 from '../../assets/raceday_logo.png'
import { backend_url } from '../../Services/api';

import '../Meme.css'
const TtNavbar = ({service,ani,count}) => {
  //  console.log("service check",service)
  const [category, setCategory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [watchlist,setWatchlist]=useState([])
  const [isWatchlistDropdownOpen, setIsWatchlistDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("count ", count)

  const navigate=useNavigate()
  const fetchCat = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/getCategory/${service}`);
     
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCat();
  }, [service]);

//  
  const handleClick=(id)=>{
    setIsDropdownOpen(false);
      setIsDrawerOpen(false)
      navigate(`/ttcategory/${id}/${service}/${ani}`)
   }

   const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/getTTWatchlist/${ani}/${service}`);
      console.log("watchlist", response.data);
      
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(()=>{
    fetchWatchlist()
   },[])

  return (
    <div>
   
<nav class="bg-white py-3 border-gray-200 text-font dark:bg-white">
  <div class="  max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={`/ttredirect?service=${service}&msisdn=${ani}&result=Active`}>
      {service=='raceday' ? <a  class="flex items-center">
        <img src={logo2} class="h-auto w-[120px] mr-3" alt="Flowbite Logo" />
    </a>:<a  class="flex items-center">
        <img src={logo} class="h-auto w-[70px] mr-3" alt="Flowbite Logo" />
    </a>}
    
    </Link>
    
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" 
    onClick={() => setIsDrawerOpen(!isDrawerOpen)}>

        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full mr-[50px] md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link to={`/ttredirect?service=${service}&msisdn=${ani}&result=Active`}>
          <a href="#" class={`block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 ${service === 'raceday' ? 'hover:text-[#f73b3b] text-[#f73b3b] ' : 'text-blue-700'}`} aria-current="page">HOME</a>
          </Link>
       
        </li>
        <li className='dropdown-container' >
        <a
  href="#"
  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  class={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${service === 'raceday' ? 'hover:text-[#f73b3b]' : 'hover:text-blue-700'}`}
>
  <div className='flex'>
  CATEGORIES
  <FaCaretDown className="ml-2 mt-1" />
  </div>

</a>
{isDropdownOpen && (
  <div className={`absolute
  mt-2 space-y-2 w-48 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-lg`}  >
    {category.map((cat) => (
      <a
        key={cat.id}
        onClick={()=>handleClick(cat.id)}
        className={`${service === 'raceday' ? 'hover:bg-[#f73b3b] hover:text-white' : 'hover:bg-gray-100'} block cursor-pointer  px-4 py-2 text-gray-900 dark:text-gray-900  dark:hover:bg-gray-800`}
      >
        {cat.category_name}
      </a>
    ))}
  </div>
)}


        </li>
        <li className='dropdown-container'>
          <a href="#" class={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${service === 'raceday' ? 'hover:text-[#f73b3b]' : 'hover:text-blue-700'}`}
           onClick={() => setIsWatchlistDropdownOpen(!isWatchlistDropdownOpen)}>
            <div className='flex'>
            WATCHLIST
           <FaCaretDown className="ml-2 mt-1" />
            </div>
     
           </a>

{isWatchlistDropdownOpen && (
  <div className=" absolute mt-2  w-50 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-lg "> 
    {watchlist.map((video) => (
  <Link to={`/ttsingle/${video.id}/${service}/${ani}`}>
      <a
        key={video.videoid}
    
        className="block cursor-pointer px-4 py-2 text-font font-light uppercase text-gray-900 dark:text-black hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {video.name}
      </a>
      </Link>
    ))}
  </div>
)}


        </li>
       
      </ul>
    </div>
  </div>
</nav>
{isDrawerOpen && (
   <div 
   className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto"
   onClick={() => setIsDrawerOpen(false)}
   style={{ backgroundColor: 'rgba(11, 22, 104, 0.9)' }}

>
   <div 
       className="flex flex-col text-xl items-center justify-center h-full relative p-4"
       onClick={e => e.stopPropagation()}
   >
            {/* Close Button */}
            <div className="absolute mt-[-30px] ">
                <ImCross size={30} onClick={() => setIsDrawerOpen(false)} className="p-2 focus:outline-none"/>
            </div>

            {/* Rest of the Drawer's Content */}
            <Link className='text-white' to={`/ttredirect?service=${service}&msisdn=${ani}&result=Active`}  onClick={() => setIsDrawerOpen(false)} >HOME</Link>
            <div className='mt-2 text-white flex items-center justify-center' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    CATEGORIES 
    <FaCaretDown className="ml-2" />
</div>

            
            {isDropdownOpen && (
                <div className="flex flex-col mt-2 rounded-lg space-y-2 bg-white">  
                    {category.map((cat) => (
                        <a
                            key={cat.id}
                            onClick={()=>handleClick(cat.id)}
                            className="block cursor-pointer text-sm p-2  text-gray-900 dark:text-black hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {cat.category_name}
                        </a>
                    ))}
                </div>
            )}

            <div className='mt-2 text-white' onClick={() => setIsWatchlistDropdownOpen(!isWatchlistDropdownOpen)}>WATCHLIST</div>
            {isWatchlistDropdownOpen && (
                <div className="flex flex-col mt-2 rounded-lg space-y-2 bg-white">  
                    {watchlist.map((video) => (
                        <Link to={`/ttsingle/${video.id}/${service}/${ani}`}>
                            <a
                                key={video.videoid}
                                className="block cursor-pointer text-sm p-2  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {video.name}
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    </div>
)}




    </div>
  );
};

export default TtNavbar;
