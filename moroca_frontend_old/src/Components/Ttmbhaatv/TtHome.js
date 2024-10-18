import React, { useEffect, useState } from 'react';
import TtNavbar from './TtNavbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import banner from '../../assets/raceday_banner.jpeg'
import './Tt.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsFillCameraVideoFill,BsFillPlayFill } from 'react-icons/bs';
import TtFooter from './TtFooter';
import { backend_url } from '../../Services/api';

const TtHome = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let ani = urlParams.get("msisdn");
  let service = urlParams.get('service');
  let result=urlParams.get('result')
// let service='ttmbhatv'

  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState('');
  const navigate = useNavigate();

  
  if(service.toLowerCase() == 'racedaytv'){
    service = 'raceday'
  }


  // const fetchSubscription = async () => {
  //   try {
  //     const serviceMap = {
  //       'ttmbhatv': 'TT MBHA TV',
  //       'raceday': 'RaceDay TV',
  //       // Add more conversions here if needed
  //     };

  //     const converted = serviceMap[service] || service;
  //     console.log("converted", converted);
  //     const response = await axios.get(
  //       `/api/redirect?ani=${ani}&service=${converted}&result=${result}`
  //     );
  //     setCount(response.data[0].COUNT);
  //     console.log("response sub", response.data[0].COUNT);
  //   } catch (error) {
  //     console.error('Error fetching subscription data:', error);
  //   }
  // }

  // const redirectUser = async (e) => {
  //   e.preventDefault();
  //   axios.post(
  //     'https://callback.bubblebobble.co.za/api/subscribe',
  //     {
  //       "msisdn" : ani,
  //       "ext_ref": "1234321-3-432-12-3rd-f-d234567654323454s-df-gfds-x",
  //       "channel": "WAP",
  //       "svc_id": "151"
  //     }
  //   ).then(res => {
  //     console.log(res.data, "got response here  =>>>>>>>>");
  //     const subsubscription_id = res.data.subscriptionId;
  //     if(res.data.result === 1) {
  //     window.location.replace(`https://sdp-p-vas-payment.telkom.co.za/151?msisdn=${ani}&subscription_id=${subsubscription_id}&ext_ref=${"testing_ref"}`)
  //     }
  //   }).catch(err => {
  //     alert("Server Error...")
  //   })
  // }

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/tt/getcatvideos/${service}`);
      setVideos(response.data);
      console.log("=======", response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  useEffect(() => {
    // redirectUser();
    fetchVideos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //   navigate(`/ttsingle/${id}/${service}/${ani}`);

  const handleClick = (id) => {
    navigate(`/ttsingle/${id}/${service}/${ani}`);
  }

  return (
    <div className='bg-black'>
      <TtNavbar service={service} ani={ani} count={count} />
      <div className='bg-black'>
        {service=='ttmbhatv'?   <div className='mt-5 container mx-auto'>
          <Slider {...settings}>
            <img
              src={slide1}
              alt={'banners'}
              className="w-full h-[210px] md:h-[500px] object-fit rounded-lg shadow-lg"
            />
            <img
              src={slide2}
              alt={'banners'}
              className="w-full h-[210px] md:h-[500px] object-fit rounded-lg shadow-lg"
            />
            <img
              src={slide3}
              alt={'banners'}
              className="w-full h-[210px] md:h-[500px] object-fit rounded-lg shadow-lg"
            />
          </Slider>
        </div>:  
        <div className='mt-5 container mx-auto'> <img
              src={banner}
              alt='raceday'
              className="w-full h-[210px] md:h-[500px] object-fit rounded-lg shadow-lg"
            />
            </div>}
     

        <div className='bg-black'>
          {videos && (
            <div>
              {videos.map((data, index) => (
                <div key={index}>
                  <div className='flex gap-2 mx-6 md:mx-[60px] mt-5'>
                    {service=='raceday'?
                       <button className='bg-[#f73b3b] rounded-md px-1  '>
                    
                       <BsFillCameraVideoFill className='mx-1' size={12} color='white' />
                     </button>:   <button className='bg-blue-600 rounded-md px-1  '>
                    
                    <BsFillCameraVideoFill className='mx-1' size={12} color='white' />
                  </button>
                  
                    }
                 {service=='raceday' ?
                    <p className='text-[#f73b3b] text-lg font-medium  md:text-xl uppercase'>{data.category.category_name}</p>:
                    <p className='text-white text-lg font-medium md:text-xl uppercase'>{data.category.category_name}</p>
                 }
                  </div>
                  <div className='rounded-lg'>
                    <Slider
                      className="grid grid-cols-1 mt-3 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2  mx-3 sm:mx-4 md:mx-8 lg:mx-10 rounded-lg"
                      slidesToShow={4}
                      slidesToScroll={1}
                      infinite={data.videos.length > 3}
                      autoplay={true}
                      speed={500}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                          },
                        },
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                          },
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                          },
                        },
                      ]}
                    >
                    {data.videos.map((image, index) => (
  <div
    key={index}
    className="rounded-lg flex flex-col md:px-3 px-1 sm:w-[300px] bg-black border-gray-200 shadow dark:bg-black dark:border-gray-700"
  >
    <div className="relative  ">
      <img
        className="h-[170px] md:h-[200px] w-[250px] rounded-lg object-cover image-hover-effect  "
        src={image.imgurl}
        alt="Video Thumbnail"
        onClick={() => handleClick(image.id)}
      />

      <button
        className="bg-white  mt-[-105px] bg-opacity-70 w-10 h-10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <BsFillPlayFill className="mx-auto" size={25} color="black" />
      </button>
    </div>
  </div>
))}

                    </Slider>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TtFooter service={service} />
    </div>
  );
};

export default TtHome;
