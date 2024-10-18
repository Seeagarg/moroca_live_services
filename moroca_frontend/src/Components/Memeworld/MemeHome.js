import React, { useState, useEffect } from 'react';
import MemeNav from './MemeNav';
import axios from 'axios';
import '../Meme.css';
import MemeFooter from './MemeFooter';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai'
import { backend_url } from '../../Services/api';


const MemeHome = ({service}) => {

  const urlParams = new URLSearchParams(window.location.search);
  let ani = urlParams.get("msisdn");
  // let service = urlParams.get('service')
  let result=urlParams.get('result')
  console.log("result",result)
  

  const [converted, setConvertedService] = useState('')
  const [count, setCount] = useState('1')
  const [likedMemes, setLikedMemes] = useState([]);


  const fetchSubscription = async () => {
    try {
      const serviceMap = {
        'ttmbhatv': 'TT MBHA TV',
        'raceday': 'RaceDay TV',
        'memeworld': 'MEME WORLD'
       
      };

      const converted = serviceMap[service] || service;
      setConvertedService(converted);
      console.log("converted", converted)
      const response = await axios.get(
        `${backend_url}/api/meme/redirect?ani=${ani}&service=${converted}&result=${result}`
      );
      console.log("resp", response.data)
      setCount(response.data[0].COUNT);
      console.log("response sub", response.data[0].COUNT);
    } catch (error) {

    }
  }
  useEffect(() => {
    // fetchSubscription()

  }, [])


  const [meme, setMeme] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [random, setRandom] = useState([])
  const navigate = useNavigate()

  const isMemeLiked = (memeId) => likedMemes.includes(memeId);

  // Toggle like for a meme
  const toggleLike = async (memeId) => {
    const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    try {
      if (isMemeLiked(memeId)) {
        // If already liked, unlike the meme
        await deleteLike(memeId, ani);
        // Remove the meme ID from the likedMemes array
        setLikedMemes(likedMemes.filter((id) => id !== memeId));
      } else {
        // If not liked, like the meme
        await postLike(memeId);
        // Add the meme ID to the likedMemes array
        setLikedMemes([...likedMemes, memeId]);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/meme/getMemeCategories`);
      setCategories(response.data);
      // console.log("categories", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchRandom = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/meme/random`);
      setRandom(response.data);
      // console.log("random", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const postLike = async (id) => {
    if(count=='1'){


      console.log('COUNTEXIST')

      const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
      try {
  
        const data = {
          like: "1",
          created: createddatetime,
          updated: createddatetime,
          id: id,
          ani: ani,
        }
  
        console.log("wish", data)
        await axios.post(`${backend_url}/api/meme/postlike`, data);
        // setIsAdded(true);
        console.log('post liked', data);
      } catch (error) {
        console.error('Error adding like:', error);
      }
    }
    else{
      window.open('http://optin.telkomsdp.co.za/service/122?cid=700011', '_blank');

    }
 
  };
  const deleteLike = async (id, ani) => {

    if(count=='1'){
      try {
        const data = {
          meme_id: id,
          ani: ani,
        };
  
        console.log("delete data", data);
        await axios.delete(`${backend_url}/api/meme/unlike`, { data: data });
        console.log('Like deleted', data);
      } catch (error) {
        console.error('Error deleting like:', error);
      }
    }
    else{
      window.open('http://optin.telkomsdp.co.za/service/122?cid=700011', '_blank');
    }

  };


  useEffect(() => {
    fetchCategories();
    fetchRandom()
  }, []);


  const handleClick = async (e) => {
    const selectedValue = e.target.value;

    if (count == '1') {
      navigate(`/memeCategory/${count}/${selectedValue}/${service}`)
    }
    if (count == '0') {
      window.open('http://optin.telkomsdp.co.za/service/122?cid=700011', '_blank');
    }
  }


  return (
    <div className='bg-black h-auto font-family '>
      <MemeNav count={count} ani={ani} service={service} />
      <div className='mx-3 py-5  bg-white h-auto '>
      <div className="relative max-w-3xl flex-col md:flex md:flex-row container justify-center gap-5 py-5 mx-auto ">
  <div className='w-full md:max-w-md text-center md:text-left px-3 mx-auto'> 
    {/* Changed max-w-md to md:max-w-md and added w-full */}
    <select
      className="block w-full bg-white border text-gray-600 font-medium border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 text-base mx-auto"
      defaultValue=""
      onChange={(e) => handleClick(e)}
    >
      <option value="" disabled>
        Browse Category
      </option>
      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
      ))}
    </select>
  </div>

  <div className='md:block flex mt-3 md:mt-0 flex-col justify-center md:flex-row'>
    <div className='text-center md:text-left'>
      <p className='md:text-xl'>Welcome to Meme World, the best and quickest way to boost your social media game!</p>
      <p className='md:text-xl mt-1'>Click on a meme to get started now!</p>
    </div>
  </div>
</div>


        <div className='grid grid-cols-2 mt-5 text-sm md:grid-cols-4 p-3 lg:grid-cols-6 gap-4 container mx-auto '>
          {random.map((rand) => {

            const memeId = rand.id;
            const isMemeAlreadyLiked = isMemeLiked(memeId);
            const apiDate = new Date(rand.created_at);

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
            // console.log("image", rand.image)
            return (
              <div key={rand.id} className='border shadow-lg meme-container'>
              <img src={`/media/${rand.image}`} className='meme-image' alt={rand.title} />
              <div className="button-container flex gap-4">
                <button className={`bg-red-600 text-white flex justify-center w-10 h-10 rounded-full`}>
                  <span className='mt-2'>{isMemeAlreadyLiked ? '1' : '0'}</span>
                </button>
                <button onClick={() => toggleLike(memeId)} className={`image-button flex justify-center w-10 h-10  rounded-full bg-${isMemeAlreadyLiked ? 'red' : 'gray'}-600`}>
                  <AiFillHeart size={18} color={isMemeAlreadyLiked ? 'red' : 'gray'} className='mt-2.5' />
                </button>
              </div>
              <p className='text-gray-600 text-md md:text-lg mx-4'>{rand.title}</p>
              <p className='text-gray-500 text-xs md:text-md mx-4 mb-4'>{formattedDate}</p>
            </div>
            
            )
          })}
        </div>

      </div>


      <MemeFooter />
    </div>
  );
};

export default MemeHome;
