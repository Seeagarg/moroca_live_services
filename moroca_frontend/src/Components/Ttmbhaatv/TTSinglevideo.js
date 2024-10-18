import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams ,Link} from 'react-router-dom'
import TtNavbar from './TtNavbar'
import { FaCalendarAlt } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { BsFillPersonFill, BsFillCameraVideoFill } from 'react-icons/bs'
import { backend_url } from '../../Services/api'


const TTSingleVideo = () => {

  const params = useParams()
  console.log("params",params)
  const [videos, setVideos] = useState([])
  const [singleVideo, setSingleVideo] = useState([])
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [videoName, setVideoName] = useState('')
  const [id, setId] = useState('')
  const [status,setStatus]=useState('')
  const [date, setDate] = useState('')
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);

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
    fetchVideo()
  }, [params.id])


  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/ttsinglevideo/${params.id}`);
      setSingleVideo(response.data);
      setUrl(response.data[0].vurl)
      setName(response.data[0].name)
      setStatus(response.data[0].status)
      setVideoName(response.data[0].video_name)
      setId(response.data[0].artist)
      console.log("id", response.data[0].artist)

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


  const fetchRelatedvideos = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/ttrelated/${status}`);
      setRelated(response.data);
      console.log('related', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRelatedvideos()
  }, [status])

  return (
    <div>
      <TtNavbar service={params.service} />
      <div className='bg-black'>
        {videos &&
          <div className=' flex-col text-white md:flex md:flex-row  container md:mx-auto'>


            <div className=' md:mt-10 '>
              <ReactPlayer
                className="justify-center"
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

            <div className='mt-9'>


              <h1 className='text-white  font-medium px-10 text-2xl'>{name}</h1>
              <div className='flex mt-3 px-10'>

              </div>
            </div>

          </div>
        }


        <div className='bg-black' >
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
                <Link to={`/ttsingle/${vid.id}/${params.service}/${params.ani}`}>
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



        </div>
      </div>
    </div>
  )
}

export default TTSingleVideo
