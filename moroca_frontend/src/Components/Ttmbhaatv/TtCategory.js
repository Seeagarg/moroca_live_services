import React, { useEffect, useState } from 'react';
import logo from '../../assets/ttlogo.png'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TtNavbar from './TtNavbar';
import TtFooter from './TtFooter';
import {BsFillPlayFill} from 'react-icons/bs'
import './Tt.css'
import { backend_url } from '../../Services/api';
const TtCategory = () => {
    const params = useParams()

    const [category, setCategory] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [catVideos, setCatVideos] = useState([])


    const fetchCat = async () => {
        try {
            const response = await axios.get(`${backend_url}/api/tt/getCategory/${params.service}`);
      
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCat();
    }, [params.service]);

    const fetchCatVideos = async () => {
        try {
            const response = await axios.get(`${backend_url}/api/tt/catVideos/${params.cat}`);
           
            setCatVideos(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchCatVideos()
    }, [params.id,params.cat])



    return (
        <div className='bg-black h-auto'>
            <TtNavbar service={params.service} count='1' ani={params.ani}/>
           


            <div className={`mt-5 border  border-black container rounded-lg mx-auto h-[150px] md:h-[180px] w-full ${params.service === 'raceday' ? 'raceday-gradient' : 'background-image'}`}>
    <h1 className='text-font text-black text-3xl py-[60px] font-medium px-5 uppercase'>
        {catVideos.categoryName}
    </h1>
</div>


            <div className='container px-3 md:mx-10 grid grid-cols-1 md:grid-cols-4 gap-4 mt-10'>
  {catVideos.videos?.map((vid) => {
    console.log("vi", vid)
    return (
      <div
        key={vid.id}
        class="hover:scale-105 border-gray-200 shadow dark:border-gray-700 relative"
      >
        <Link to={`/ttsingle/${vid.id}/${params.service}`}>
          <div className="relative">
            <img
              class="bg-black w-full h-[200px] md:h-[180px] object-cover object-top"
              src={vid.imgurl}
              alt=""
            />
            <button
              className="bg-white mt-[-90px] bg-opacity-70 w-10 h-10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <BsFillPlayFill className="mx-auto" size={25} color="black" />
            </button>
          </div>
        </Link>
        <div class="px-2 py-2">
          <h5 class="text-md mt-5 tracking-tight text-white text-font dark:text-white">
            {vid.name}
          </h5>
        </div>
      </div>
    )
  })}
</div>

            <TtFooter service={params.service}/>
        </div>
    )
}

export default TtCategory
