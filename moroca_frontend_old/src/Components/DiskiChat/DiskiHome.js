import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mcposter from '../../assets/mcposter.png';
import '../Slide.css';
import TinderCard from 'react-tinder-card';
import diski from '../../assets/diski99.png'
import { FaListAlt, FaTimes, FaHeart, FaHome } from 'react-icons/fa'
import { backend_url } from '../../Services/api';


const DiskiHome = () => {
  const param = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  let ani = urlParams.get('msisdn');
  let service = urlParams.get('service');
  let result=urlParams.get('result')

  const [artists, setArtists] = useState([]);
  const [count,setCount]=useState('')
  const [videos, setVideos] = useState([]);
  const [img, setimg] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [data, setData] = useState([]);
  const [convertedService, setConvertedService] = useState('');
  const [showCrossIcon, setShowCrossIcon] = useState(false);
  const [showHeartIcon, setShowHeartIcon] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Added for mobile view

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


  const navigate = useNavigate();

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/diski/fetchArtist?service=diski99`);
      setArtists(response.data);
      console.log('dataaaa', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const serviceMap = {
        diski99: 'Diski 99',
        diskichat: 'Diski Chat',
      };
      const convertedd = serviceMap[service] || service;
      setConvertedService(convertedd);

      const response = await axios.get(`${backend_url}/api/diski/redirect?ani=${ani}&service=${convertedd}&result=${result}`);
      setData(response.data);
      setCount(response.data[0].COUNT)
      console.log('mcdata', response.data[0].COUNT);
    } catch (error) { }
  };

  useEffect(() => {
    fetchUser();
    fetchArtists();
  }, []);

  const fetchVideos = async (id) => {
    try {
      const response = await axios.get(`${backend_url}/api/diski/fetchVideos/${id}`);
      console.log('videos', response.data);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSwipe = async (direction, deltaX, artistId) => {
    const swipeThreshold = 10;

    if (direction === 'right' && deltaX > swipeThreshold) {
      console.log(`Swiped right for artist with ID ${artistId}`);
      await fetchVideos(artistId);
    } else if (direction === 'left' && deltaX < -swipeThreshold) {
      console.log(`Swiped left for artist with ID ${artistId}`);
    }
  };


  const swiped = async (direction, nameToDelete, id) => {
    setLastDirection(direction);

    if (direction === 'right') {
      // Show the heart icon
      setShowHeartIcon(true);

      // Delay navigation by 2 seconds
      setTimeout(() => {
        navigate(`/artistvideos/${id}/${service}/${ani}/${count}`);

      }, 2000);
    } else if (direction === 'left') {
      // Show the cross icon
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

   
<nav class="navbar family bg-white sticky  z-50 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       
          <a className="flex items-center">
          <span className="md:hidden mr-2">
          <Link to={`/redirect?service=${service}&msisdn=${ani}&result=active`}>   <FaHome color='black' size={25} /></Link>
        </span>
          </a>
            <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-black diski-family capitalize" >{service}</span>
         
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
                  <Link  to={`/doRedirect?service=diski99&msisdn=${ani}&result=active`} className="block py-2 text-black font-bold cursor-pointer hover:bg-gray-100" onClick={toggleDrawer} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Home
                  </Link>
                </li>
                {artists.map((person) => (
                  <li key={person.id}>
                    <Link to={`/artistvideos/${person.id}/diski99/${ani}/${count}`}>

                      <a
                        className="block text-gray-900 font-bold hover:bg-gray-100"
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
                <Link to={`/doRedirect?service=diski99&msisdn=${ani}&result=active`}>
                <a href="#" class="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </Link>
              
              </li>

              {artists.map((person) => (

<li key={person.id}>
  <Link to={`/artistvideos/${person.id}/diski99/${ani}/${count}`}>
    <a

      className="block text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      {person.artist}
    </a>
  </Link>
</li>

))}
            </ul>
          </div>
        </div>
      </nav>



      <div className="mxx-auto flex md:justify-center" style={{ marginTop: '5rem' }}>
  <div className="cardContainer">

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
        style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6)),url(${diski})`, fontfamily: "'Jost', sans-serif" }}
        className='card'
      >
        <div className='text-white px-3 text-xl mt-[270px]'>COME BACK FOR MORE CONTENT SOON.</div>
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
          style={{ backgroundImage: `url(${character.artist_img_url})`, fontfamily: "'Jost', sans-serif" }}
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

          <div className='cardContent text-white px-3 py-[270px]'>
            <h3 className='text-3xl uppercase font-bold text-white' style={{ letterSpacing: '0.1rem' }}>
              {character.artist}
            </h3>
            <div className='flex'>
              <div className='flex gap-2 '>
                <FaListAlt className='mt-1' color='white' /><span className='font-medium'>Footballer , </span>
              </div>
              <span>#{character.id}</span>
            </div>
            <p>{character.description}</p>
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
          backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6)), url(${diski})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontfamily: "'Jost', sans-serif"
        }}
        className='card'
      >
        <p className='text-white px-3 text-2xl mt-[270px]'>HOW TO USE THE SITE :</p>
        <p className='text-white px-3'>Swipe right if you like what you see.</p>
        <p className='text-white px-3'>Swipe left if you want to see something else.</p>
      </div>
    </TinderCard>
  </div>
</div>


    </>
  );
};

export default DiskiHome;
