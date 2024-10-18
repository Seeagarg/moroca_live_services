import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import TtNavbar from './TtNavbar'
import { FaCalendarAlt } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { BsFillPersonFill, BsFillCameraVideoFill, BsFillPlayFill, BsFillEyeFill, BsFillInfoCircleFill } from 'react-icons/bs'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiLike, BiPlus } from 'react-icons/bi'
import './Tt.css'
import { MdDone } from 'react-icons/md'
import TtFooter from './TtFooter'
import { backend_url } from '../../Services/api'

const SingleTTVideo = () => {

  const params = useParams()
  // console.log("params", params)
  const [videos, setVideos] = useState([])
  const [singleVideo, setSingleVideo] = useState([])
  const [url, setUrl] = useState('')
  const [videoid, setVideoId] = useState('')
  const [name, setName] = useState('')
  const [videoName, setVideoName] = useState('')
  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);



  const [related, setRelated] = useState([])

  const handleProgress = (progress) => {

    setPlayedSeconds(progress.playedSeconds);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideo()
  }, [params.id])


  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/ttsinglevideo/${params.id}`);
      setSingleVideo(response.data);
      setStatus(response.data[0].status)
      setUrl(response.data[0].vurl)
      setName(response.data[0].name)
      setCategory(response.data[0].category)

      setVideoName(response.data[0].video_name)
      setVideoId(response.data[0].videoid)
      setId(response.data[0].artist)
      console.log("id", response.data[0].artist)

     
      console.log("data", response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchRelatedvideos = async () => {
    try {
      console.log("status", status)
      const response = await axios.get(`${backend_url}/api/tt/ttrelated/${status}`);
      setRelated(response.data);
      console.log('related', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    // if(status != '' || status != undefined || status != null){
      fetchRelatedvideos()
    // }
  }, [status])


  const postLike = async (id) => {
   

      const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
      try {
  
        const data = {
          videoid:videoid,
          ani: params.ani,
          status:'1',
          servicename:params.service,
          created: createddatetime,
        }
  
        console.log("videoliked", data)
        await axios.post(`${backend_url}/api/tt/likevideo`, data);
        // setIsAdded(true);
        console.log('post liked', data);
      } catch (error) {
        console.error('Error adding like:', error);
      }
  
  };

  const handleWatchlist = async () => {

    try {

      const wishvideo = {
        ani: params.ani,
        videoid: videoid,
        service: params.service,
        name: name

      }
      console.log("wish", wishvideo)
      await axios.post(`${backend_url}/api/tt/ttaddwatchlist`, wishvideo);
      setIsAdded(true);
      console.log('Video added to watchlist', wishvideo);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };
  const handleRemoveFromWatchlist = async () => {
    try {
      await axios.delete(`${backend_url}/api/tt/ttremove`, {
        data: {
          ani: params.ani,
          videoid: videoid
        }
      });

      console.log("removed")
      setIsAdded(false);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove video. Please try again.');
    }
  }

  const unlikeVideo = async () => {
    try {
      await axios.delete(`${backend_url}/api/tt/unlikevideo`, {
        data: {
          ani: params.ani,
          videoid: videoid
        }
      });

      console.log("removed")
      
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove video. Please try again.');
    }
  }


  const toggleLike = async () => {
    if (isLiked) {
      // Unliking the video
      await unlikeVideo();
      setIsLiked(false);
    } else {
      // Liking the video
      await postLike();
      setIsLiked(true);
    }
  };

  console.log("check", videos)
  return (
    <div>
      <TtNavbar service={params.service} ani={params.ani} count='1' />
      <div className='bg-black'>

        {videos &&
          <div className=' flex-col text-white md:flex md:flex-row  container md:mx-auto'>

            <div className=' md:mt-10 mx-4 flex justify-center'>
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

            <div className=' mt-4 md:mt-9 md:mx-10 text-font '>


              <h1 className='text-white  font-medium uppercase px-10 text-2xl'>{name}</h1>
              <div className='flex mt-3 gap-3 px-10'>
              <div className='flex gap-1' onClick={toggleLike}>
          <BiLike className='mt-1' color={isLiked ? 'blue' : 'white'} />Like
        </div>
                <div className='flex gap-1' >
                  {isAdded ? <div className='flex ' onClick={() => handleRemoveFromWatchlist()}>
                    <MdDone className='mt-1' />Watchlist

                  </div> : <div className='flex' onClick={() => handleWatchlist()}>
                    <BiPlus className='mt-1' /> Watchlist
                  </div>}
                </div>
                <div className='flex gap-1 '>
                  <BsFillEyeFill className='mt-1' />Views (0)
                </div>
              </div>
              <div className='flex mx-10 mt-5  gap-2'>
                {params.service=='raceday' ? <>
                <BsFillInfoCircleFill className='mt-1' color='#f73b3b' /><p className='text-[#f73b3b]'>CATEGORY:</p>
                </> :
                <>
 <BsFillInfoCircleFill className='mt-1' color='blue' /><p className='text-blue-600'>CATEGORY:</p>
                </>
                }
           {category}

              </div>
            </div>

          </div>
        }

        <div className='text-font  '>
          <div className='flex gap-2 mx-8 md:mx-[60px] mt-8'>
            {params.service == 'raceday' ? <>
              <button className='bg-[#f73b3b] rounded-md px-1  '>

                <BsFillCameraVideoFill className='mx-1 ' size={12} color='white' />
              </button>
            </> :

              <button className='bg-blue-600 rounded-md px-1  '>

                <BsFillCameraVideoFill className='mx-1 ' size={12} color='white' />
              </button>}

                 {params.service=='raceday' ? <>
                 <p className='text-[#f73b3b] text-sm md:text-xl uppercase'>Related Videos</p>
                 </>:
                             <p className='text-white text-sm md:text-xl uppercase'>Related Videos</p>}

          </div>
          <Slider
            className="grid grid-cols-1 mt-3 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1  mx-3 sm:mx-4 md:mx-8 lg:mx-10"
            slidesToShow={4} // Number of slides to show at a time
            slidesToScroll={1} // Number of slides to scroll
            infinite={related.length > 3}
            autoplay={true} // Autoplay the carousel
            speed={500}

            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4, // Show 4 videos in desktop mode
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2, // Show 2 videos in tablet mode
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2, // Show 1 video in mobile mode
                  slidesToScroll: 1,
                },
              },
            ]}
          >


            {Array.isArray(related) &&
              related?.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg flex flex-col md:px-3 px-1 sm:w-[300px] bg-black border-gray-200 shadow dark:bg-black dark:border-gray-700"
                >
                  <Link to={`/ttsingle/${image.id}/${params.service}`}>
                    <div className="relative">
                      <img
                        className="h-[170px] md:h-[250px] w-[250px] rounded-lg object-cover"
                        src={image.imgurl}
                        alt="Video Thumbnail"
                      />
                      <button
                        className="bg-white bg-opacity-70 mt-[-110px] w-10 h-10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <BsFillPlayFill className="mx-auto" size={25} color="black" />
                      </button>
                    </div>
                  </Link>
                  <div>
                    <p
                      className="text-white text-xs md:text-lg uppercase mt-2"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {image.name}
                    </p>
                  </div>
                </div>
              ))}





          </Slider>
        </div>


        {/* <div className='bg-black' >
          <div className='flex gap-2 mx-6 md:mx-[60px] mt-5'>
            <button className='bg-blue-600 rounded-md px-1  '>

              <BsFillCameraVideoFill className='mx-1 ' size={12} color='white' />
            </button>
            <p className='text-white text-sm md:text-xl uppercase'>Related Videos</p>
          </div>
          <div class="grid grid-cols-2 font-family md:mt-10 md:p-10 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {related.map((vid) => {
           
            return (
              <div

                key={vid.id}
                class=" bg-white border hover:scale-105 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/ttsingle/${vid.videoid}/${params.service}`}>
                  <img class="rounded-t-lg w-full  md:h-[300px] object-cover object-top" src={vid.imgurl} alt="" />
                </Link>

                <div class="px-5 py-2">

                  <h5 class=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {vid.video_name}
                  </h5>

                </div>
              </div>
            );
          })}
        </div>



        </div> */}
        <TtFooter service={params.service}/>
      </div>

    </div>
  )
}

export default SingleTTVideo
