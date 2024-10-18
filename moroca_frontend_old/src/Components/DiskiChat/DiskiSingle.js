import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaCalendarAlt,FaHome } from 'react-icons/fa'
import '../Meme.css'
import '../Slide.css'
import Navbar from '../Navbar'
import Footer from '../Footer';
import { backend_url } from '../../Services/api';
// import Footer from './Footer';


const DiskiSingle = () => {
  const navigate = useNavigate()
  const params = useParams()
  console.log("diskiparam",params)
  const artist = params.service === 'Mad Funny' ? 'Mc Funny' : params.service;
  // console.log("params",params)
  const [video, setVideo] = useState([])
  const [artists, setArtists] = useState([]);
  const [videos, setVideos] = useState([])
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [url, setUrl] = useState('')
  const playerRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [name, setName] = useState('')
  const [videoname, setVideoName] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [related, setRelated] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const handleProgress = (progress) => {

    setPlayedSeconds(progress.playedSeconds);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };


  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/diski/fetchArtist?service=diski99`);
      setArtists(response.data);
      console.log("diskiiartisst",response.data)
  
      console.log('data==========', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);


  const fetchRelatedvideos = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/diski/common/${params.mid}`);
      setRelated(response.data);
      console.log('related', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRelatedvideos()
  }, [params.mid])


  const fetchVideo = async () => {


    try {
      const response = await axios.get(`${backend_url}/api/diski/fetchsingle/${params.id}`);
      setVideo(response.data);
      setUrl(response.data[0].vurl)
      setName(response.data[0].name)
      setVideoName(response.data[0].video_name)
      setId(response.data[0].artist)
   
      console.log("id",response.data[0].artist)

      const apiDate = new Date(response.data[0].datetime);


      const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
      ];

      const day = apiDate.getDate();
      const month = months[apiDate.getMonth()];
      const year = apiDate.getFullYear();

      const formattedDate = `${day} ${month}, ${year}`;
      setDate(formattedDate)
      console.log("data", response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideo()
  }, [params.id])

 
  return (
    <>
       {/* <nav className="bg-white font-family sticky top-0 z-50 opacity-60">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center">
            {params.service==='diskichat' ?
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Diski Chat
            </span>:
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Diski 99
        </span>
                
        }
          </a>
          <button
            onClick={toggleDrawer}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
       
          {isDrawerOpen && (
            <div className="fixed top-0 left-0 w-64 h-full bg-white overflow-y-auto" style={{ zIndex: 100 }}>
              <ul className="p-4 space-y-4">
                <li>
                  <Link to={`/doRedirect?service=diski99&msisdn=${params.ani}&result=active`}>
                
                  <a className="block font-bold py-2 text-black hover:bg-gray-100" onClick={toggleDrawer} style={{ fontFamily: "'DM Sans', sans-serif"}}>
                    Home
                  </a>
                  </Link>
                </li>
                {artists.map((person) => (
                  <li key={person.id}>
                    <Link
                      to={`/artistvideos/${person.id}/${params.service}/${params.ani}`}
                      onClick={() => {
                       
                        toggleDrawer();
                      }}
                    >
                      <a className="block py-2 font-bold  text-gray-900 hover:bg-gray-100" onClick={toggleDrawer}
                      style={{ fontFamily: "'DM Sans', sans-serif"}}>
                        {person.artist}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          
<div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
              <Link to={`/doRedirect?service=diski99&msisdn=${params.ani}&result=active`}>
                <a href="#" className="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </Link>
              </li>


              {artists.map((person) => (
                <li key={person.id}>
                  <Link  to={`/artistvideos/${person.id}/${params.service}/${params.ani}`}>
                  <a className="block text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {person.artist}
                  </a>
                  </Link>
                </li>
              ))}

            </ul>
          </div>

       
        </div>
      </nav> */}

<nav class="navbar diski-family bg-white sticky  z-50 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       
          <a className="flex items-center">
          <span className="md:hidden mr-2">
          <Link to={`/doRedirect?service=diski99&msisdn=${params.ani}&result=active`}>   <FaHome color='black' size={25} /></Link>
        </span>
          </a>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black diski-family capitalize" >{params.service}</span>
         
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
                <Link to={`/doRedirect?service=diski99&msisdn=${params.ani}&result=active`} className="block py-2 text-black font-bold cursor-pointer hover:bg-gray-100 diski-family" onClick={toggleDrawer} >
                    Home
                  </Link>
                </li>
                {artists.map((person) => (
                  <li key={person.id}>
                    <Link
                      to={`/artistvideos/${person.id}/${params.service}/${params.ani}/1`}
                      onClick={() => {
                       
                        toggleDrawer();
                      }}
                    >
                      <a className="block py-2 font-bold  text-gray-900 hover:bg-gray-100" onClick={toggleDrawer}
                      style={{ fontFamily: "'DM Sans', sans-serif"}}>
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
              <Link to={`/doRedirect?service=diski99&msisdn=${params.ani}&result=active`}>
                <a href="#" class="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </Link>
              
              </li>

              {artists.map((person) => (
                <li key={person.id}>
                  <Link  to={`/artistvideos/${person.id}/${params.service}/${params.ani}/1`}>
                  <a className="block text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {person.artist}
                  </a>
                  </Link>
                </li>
              ))}

            </ul>
          </div>
        </div>
      </nav>

<div>
{video &&
        <div className='md:mt-10 flex-col md:flex md:flex-row  container md:mx-auto'>


          <div className=' flex justify-center'>
            <ReactPlayer
              className="justify-center  "
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              url={url}
              playing={isPlaying}
              loop={true}
              controls={true}
              onProgress={handleProgress}
              onPlay={handlePlay}
              onPause={handlePause}
              ref={playerRef}
              onError={(e) => console.error('Error loading video:', e)}
            />
          </div>

          <div className='diski-family'>


            <h1 className='text-black font-bold px-5  md:px-10  text-2xl'>{videoname}</h1>
            <div className='flex mt-3 px-5 md:px-10'>
              <p className='flex   '><BsFillPersonFill className='mt-1 mr-2 ' color='gray' />{name} |</p>
              <p class="mb-3 flex gap-1 mx-2    text-gray-700 ">
                <FaCalendarAlt className='mt-1 ' color='gray' />  {date}
              </p>
            </div>
          </div>

        </div>
      }
</div>
    



      <div className='mt-10 container md:mx-10 diski-family'>
        <h1 className='text-black mx-5 md:mx-10 text-2xl font-bold'> Related Videos</h1>
        <div class="grid grid-cols-2 diski-family md:mt-5 md:p-10 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {related.map((vid) => {
            const apiDate = new Date(vid.datetime);


            const months = [
              "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
              "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];

            const day = apiDate.getDate();
            const month = months[apiDate.getMonth()];
            const year = apiDate.getFullYear();

            // Format the date in the desired format (e.g., "12 JULY, 2021")
            const formattedDate = `${day} ${month}, ${year}`;

            return (
              <div

                key={vid.id}
                class=" bg-white border hover:scale-105 border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200"
              >
               <Link to={`/diskisingle/${vid.videoid}/diski99/${params.ani}/1`}>
                  <img class="rounded-t-lg w-full  md:h-[250px] object-cover object-top" src={vid.imgurl} alt="" />
                </Link>

                <div class="px-0.5 md:px-5 py-2">

                  <h5 class=" text-md  md:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                    {vid.video_name}
                  </h5>

                  <p class="mb-3 flex gap-1    text-gray-700 dark:text-gray-700 ">
                    <FaCalendarAlt className='mt-1' />  {formattedDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
<Footer/>
    </>

  )
}

export default DiskiSingle
