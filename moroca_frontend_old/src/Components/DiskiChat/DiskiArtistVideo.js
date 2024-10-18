import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import diski from '../../assets/diski99.png'
import { Link,useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import DiskiAllVideos from './DiskiAllVideos';
import Footer from '../Footer';
import '../Slide.css'
import { backend_url } from '../../Services/api';

const DiskiArtistVideo = () => {
  const param = useParams();
  console.log("diksiparams", param)

  const [artists, setArtists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [artistid, setArtistId] = useState(param.id);
  const [videoname, setVideoName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [artistName, setArtistName] = useState('')

  const navigate=useNavigate()

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/diski/fetchArtist?service=diski99`);
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
      const response = await axios.get(`${backend_url}/api/diski/fetchVideos/${artistid}`);
      setVideos(response.data);
      console.log("vid", response.data)
      setVideoName(response.data[0].video_name);
      setArtistName(response.data[0].name)
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
 

        <div className='gradient-bg'>
        <p class="mobile-text  text-white font-bold text-4xl mt-10 mx-2 diski-family ">{artistName}</p>
          
          <nav class="navbar  diski-family bg-white sticky  z-50 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

              <a className="flex items-center">
                <span className="md:hidden mr-2">
                  <Link to={`/doRedirect?service=${param.service}&msisdn=${param.ani}&result=active`}>   <FaHome color='black' size={25} /></Link>
                </span>
              </a>
              <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-black diski-family capitalize" >{param.service}</span>

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
                      <Link to={`/doRedirect?service=diski99&msisdn=${param.ani}&result=active`} className="block py-2 text-black font-bold cursor-pointer hover:bg-gray-100 diski-family" onClick={toggleDrawer} >
                        Home
                      </Link>
                    </li>
                    {artists.map((person) => (
                      <li key={person.id}>
                        <a
                          className="block diski-family text-gray-900 font-bold hover:bg-gray-100"
                         
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

              <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link to={`/doRedirect?service=diski99&msisdn=${param.ani}&result=active`}>
                      <a href="#" class="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                    </Link>

                  </li>

                  {artists.map((person) => (
                    <li key={person.id}>
                      <a onClick={() => setArtistId(person.id)} className="block diski-family text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        {person.artist}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

      <DiskiAllVideos videos={videos} service={param.service} mid={param.id} ani={param.ani} count={param.count}/>

      <Footer/>
    </>
  );
};

export default DiskiArtistVideo;
