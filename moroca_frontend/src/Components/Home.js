import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mcposter from '../assets/mcposter.png'
import AllVideos from './AllVideos';
import './Slide.css'
import TinderCard from 'react-tinder-card';
import SwipingCard from './SwipingCard';
import { FaListAlt } from 'react-icons/fa'
import { FaTimes,FaHome, FaHeart } from 'react-icons/fa';
import mcswipe from '../assets/mcswipe.png'
import mad from '../assets/mad.png'
import { backend_url } from '../Services/api';

const Home = ({service}) => {
  const param = useParams();

  const urlParams = new URLSearchParams(window.location.search);
  let ani = urlParams.get("msisdn");
  // let service = urlParams.get('service')
  console.log("srevice from param", service)
  let result=urlParams.get('result')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  // console.log("urlparams", ani, service)
  const [showCrossIcon, setShowCrossIcon] = useState(false);
  const [showHeartIcon, setShowHeartIcon] = useState(false);
  const [count,setCount]=useState('')
  const [artists, setArtists] = useState([]);
  const [data, setData] = useState([])
  const [videos, setVideos] = useState([])
  const [img, setimg] = useState([])
  const [lastDirection, setLastDirection] = useState()
  const navigate = useNavigate()
  const [convertedService, setConvertedService] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const modifiedService = (service == 'madfunny' || service == 'Mad Funny') ? 'MC Funny' : service;
  console.log("modiefiesd", modifiedService)


  useEffect(() => {
    let timer;

    if (showCrossIcon || showHeartIcon) {
      timer = setTimeout(() => {
        setShowCrossIcon(false);
        setShowHeartIcon(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showCrossIcon, showHeartIcon]);



  const fetchArtists = async () => {

    try {
      const response = await axios.get(`${backend_url}/api/madfunny/fetchArtist?service=${modifiedService}`);
      setArtists(response.data);

      console.log('home data', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchUser()
    fetchArtists();
  }, []);


  const fetchUser = async () => {

    try {
      const serviceMap = {
        'diski99': 'Diski 99'
      };
      const converted = serviceMap[service] || service;
      setConvertedService(converted);
      // console.log("converted",converted)

      const response = await axios.get(`${backend_url}/api/madfunny/redirect?ani=${ani}&service=${service}&result=${result}`);
      setData(response.data);
      setCount(response.data[0].COUNT)

      console.log("subdata", response.data[0].COUNT)

      // navigate(`/redirect?service=${service}&msisdn=${ani}&result=active`)


    } catch (error) {

    }
  }


  useEffect(() => {

  }, [])
  const fetchVideos = async (id) => {
    try {
      const response = await axios.get(`${backend_url}/api/madfunny/fetchVideos/${id}`)
      // console.log("videos", response.data);
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }


  const handleSwipe = async (direction, deltaX, artistId) => {
    // Define a threshold (you can adjust this value)
    const swipeThreshold = 10;

    if (direction === 'right' && deltaX > swipeThreshold) {
      // Handle right swipe (like) and fetch videos here
      // console.log(`Swiped right for artist with ID ${artistId}`);
      await fetchVideos(artistId);
    } else if (direction === 'left' && deltaX < -swipeThreshold) {
      // Handle left swipe (dislike)
      // console.log(`Swiped left for artist with ID ${artistId}`);
    }
  };


  const swiped = async (direction, nameToDelete, id) => {
    setLastDirection(direction);

    if (direction === 'right') {
      
      setShowHeartIcon(true);
    
      setTimeout(() => {
        navigate(`/allvideos/${id}/${service}/${count}`);
      }, 1000);
    } else if (direction === 'left') {
     
      setShowCrossIcon(true);
    }
  };

  const outOfFrame = (name) => {
    
    setShowCrossIcon(false);
    setShowHeartIcon(false);
  };

  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (
    <>

{!isMobile && (
        <div
          className="fullscreen-bg"
          style={{
            backgroundImage: `url(${mcposter})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            filter: 'blur(10px)'
          }}
        ></div>
      )}

{/* <div
          className="fullscreen-bg"
          style={{
            backgroundImage: `url(${mcposter})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            filter: 'blur(10px)'
          }}
        ></div> */}

      <nav class="navbar family bg-white sticky  z-50 opacity-90">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       
          <a className="flex items-center">
          <span className="md:hidden mr-2">
          <Link to={`/redirect?service=${service}&msisdn=${ani}&result=active`}>   <FaHome color='black' size={25} /></Link>
        </span>
          </a>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black family" >{service}</span>
         
          <button
            onClick={toggleDrawer} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>


          {isDrawerOpen && (
            <div className="fixed top-0 left-0 w-64 h-full bg-white overflow-y-auto" style={{ zIndex: 100 }}>
              <ul className="p-4 space-y-4">
                <li>
                  <Link to={`/redirect?service=${param.service}&msisdn=${param.ani}&result=active`} className="block py-2 text-black font-bold cursor-pointer hover:bg-gray-100" onClick={toggleDrawer} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Home
                  </Link>
                </li>
                {artists.map((person) => (
                  <li key={person.id}>
                    <Link to={`/allvideos/${person.id}/${service}/${ani}`}>
                      <a
                        className="block cursor-pointer  text-gray-900 font-bold hover:bg-gray-100"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        onClick={() => {

                          toggleDrawer();
                        }}
                      >
                        {person.artist}
                      </a>
                    </Link>

                  </li>
                ))}
              </ul>
            </div>
          )}

          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li>

              {artists.map((person) => (
                <li key={person.id} className='family'>
                  <Link
                    to={`/allvideos/${person.id}/${service}/${ani}`}
                    className="block text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {person.artist}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

    

<div className='mxx-auto  flex md:justify-center' style={{ marginTop: '5rem' }}>
      <div className='cardContainer'>
        {/* Top Image */}
        <TinderCard
          className='swipe top-card'
          key='top-card'
          preventSwipe={['left', 'right']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
           <div
            style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6)),url(${mad})`,  fontfamily: "'Jost', sans-serif", }} // Use the imported image for both top and end images
            className='card '
          >
                <div className='text-white px-3 text-xl mt-[270px]   '>COME BACK FOR MORE CONTENT SOON.</div>
          </div>
        </TinderCard>

        {/* Artist Cards */}
        {artists.map((character, index) => (
          <TinderCard
            className={`swipe ${index === 0 ? 'first-card' : ''}`}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, character.id)}
            onCardLeftScreen={() => outOfFrame(character.name)}
            style={{
              position: 'absolute',
              transform: `scale(${1 - index * 0.05}) translateY(${index * -60}px)`,
              zIndex: 7 - index,
              opacity: 1 - index * 0.1,
            }}
          >
            <div
              style={{ backgroundImage: ` url(${character.artist_img_url})` }}
              className='card'
            >
              {showCrossIcon && (
                <div className={`icon-cross ${showCrossIcon ? 'pop-up' : ''}`}>
                  <FaTimes color='rgba(255, 255, 255, 0.8)' size={120} />
                </div>
              )}

              {showHeartIcon && (
                <div className={`icon-heart ${showHeartIcon ? 'pop-up' : ''}`}>
                  <FaHeart color='rgba(247, 176, 187, 0.8)' size={120} />
                </div>
              )}

              <div className='cardContent cardContentt text-white px-3 py-[220px]  ' style={{
              fontfamily: "'Jost', sans-serif",

              }}>
                <h3 className='text-3xl uppercase font-bold  text-white ' style={{ letterSpacing: '0.1rem' }}>
                  {character.artist}
                </h3>
                <div className='flex'>
                  <div className='flex gap-2 '>
                    <FaListAlt className='mt-1 ' color='white' />
                    <span className='font-medium'>Comedian , </span>
                  </div>
                  <span className=''> #{character.id}</span>
                </div>
                <p className=''>{character.description}</p>
              </div>
             
            </div>
            
          </TinderCard>
        ))}

        {/* End Image */}
        <TinderCard
          className='swipe end-card'
          
          key='end-card'
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
            <div
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6)), url(${mad})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              
            }} // Use the imported image for both top and end images
            className='card top-card-image family'
          >
 <p  className='text-white px-3 text-2xl mt-[270px] '>HOW TO USE THE SITE :</p>
 <p  className='text-white px-3 '>Swipe right if you like what you see.</p>
 <p  className='text-white px-3 '>Swipe left if you want to see something else.</p>

          </div>
        </TinderCard>
      </div>
    </div>


    <AllVideos videos={videos} service={service} count={count} />

    </>
  );
};

export default Home;
 