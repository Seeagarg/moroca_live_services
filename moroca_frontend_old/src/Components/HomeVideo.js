import axios from 'axios';
import React, { useState, useEffect ,useRef} from 'react';
import { useParams } from 'react-router-dom';
import mcposter from '../assets/mcposter.png';
import AllVideos from './AllVideos';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import Footer from './Footer';
import {FaHome} from 'react-icons/fa'
import './Slide.css'
import { backend_url } from '../Services/api';

const HomeVideo = () => {
  const param = useParams();
  console.log("useparams=========",param)
  const artist = (param.service == 'madfunny' || param.service == 'Mad Funny') ? 'Mc Funny' : param.service;







  const [artists, setArtists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [artistid, setArtistId] = useState(param.id);
  const [videoname, setVideoName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const windowHeight = window.innerHeight;
  const scrollPosition = windowHeight / 2; // Scroll to half of the window's height
  


 

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/madfunny/fetchArtist?service=${artist}`);
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/madfunny/fetchVideos/${artistid}`);
      setVideos(response.data);
      setVideoName(response.data[0].video_name);

      const windowHeight = window.innerHeight;
      const scrollPosition = windowHeight / 2;
  
      // Scroll to the calculated position
      window.scrollTo(0, scrollPosition);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchVideos();
  }, [artistid]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav className="navbar family bg-white sticky  z-50 opacity-90">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <span className="md:hidden mr-2">
          <Link to={`/redirect?service=${param.service}&msisdn=${param.ani}&result=active`}>   <FaHome color='black' size={25} /></Link>
        </span>
          </a>
        
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">{param.service}</span>
        
          <button
            onClick={toggleDrawer}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-100 dark:focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 ${isDrawerOpen ? 'rotate-90' : ''}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          {isDrawerOpen && (
            <div className="fixed top-0 left-0 w-64 h-full bg-white overflow-y-auto" style={{ zIndex: 100 }}>
              <ul className="p-4 space-y-4">
                <li>
                  <Link to={`/redirect?service=${param.service}&msisdn=${param.ani}&result=active`} className="block py-2 text-black font-bold cursor-pointer hover:bg-gray-100" onClick={toggleDrawer} style={{ fontFamily: "'DM Sans', sans-serif"}}>
                    Home
                  </Link>
                </li>
                {artists.map((person) => (
                  <li key={person.id}>
                    <a
                      className="block cursor-pointer  text-gray-900 font-bold hover:bg-gray-100"
                      style={{ fontFamily: "'DM Sans', sans-serif"}}
                      onClick={() => {
                        setArtistId(person.id);
                        toggleDrawer();
                      }}
                    >
                      {person.artist}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                 <Link to={`/redirect?service=${param.service}&msisdn=${param.ani}&result=active`}>
                 <a href="#" className=" cursor-pointer block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                 </Link>
              
              </li>

              {artists.map((person) => (
                <li key={person.id}>
                  <a onClick={() => setArtistId(person.id)} className="block cursor-pointer text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {person.artist}
                  </a>
                </li>
              ))}

            </ul>
          </div>

        </div>
      </nav>
      <div className="relative w-full   md:min-h-screen" style={{ position: 'relative', height: '50vh' }}>
        <div className="inset-0 " 
        style={{ position: 'absolute',
         backgroundImage: `url(${mcposter})`,
          backgroundPosition: 'center',
           backgroundSize: 'cover', 
           filter: 'blur(1.5px)',
           }}></div>


        <div className="absolute uppercase text-4xl font-bold mx-4  md:mx-10  bottom-0 mt-[-100px] left-0 text-white p-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.2rem' }}>
          {videoname}
        </div>
      </div>

      <AllVideos videos={videos} count={param.count || 1} service={param.service}  ani={param.ani} mid={param.id}  />
      <Footer/>
    </>
  );
};

export default HomeVideo;
