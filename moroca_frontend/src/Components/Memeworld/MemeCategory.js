import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import MemeNav from './MemeNav';
import '../Meme.css'
import MemeFooter from './MemeFooter';
import {AiFillHeart} from 'react-icons/ai'
import { backend_url } from '../../Services/api';


const MemeCategory = () => {
    const params=useParams()
    console.log("pramsss",params)
    const [meme,setMeme]=useState([])
    const [name,setName]=useState('')
  const [likedMemes, setLikedMemes] = useState([]);

    // console.log("categoryparams",params)
    const handleCategoryChange = async () => {

        try {
          const response = await axios.get(`${backend_url}/api/meme/getMemeValue/${params.id}`);
          setMeme(response.data.memeData);
          setName(response.data.categoryName)
          console.log("meme", response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(()=>{
        handleCategoryChange()
      },[params.id])


      const isMemeLiked = (memeId) => likedMemes.includes(memeId);

   
      const toggleLike = async (memeId) => {
        const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
        try {
          if (isMemeLiked(memeId)) {
       
            await deleteLike(memeId, params.ani);
     
            setLikedMemes(likedMemes.filter((id) => id !== memeId));
          } else {

            await postLike(memeId);
    
            setLikedMemes([...likedMemes, memeId]);
          }
        } catch (error) {
          console.error('Error toggling like:', error);
        }
      };

      const postLike = async (id) => {
        const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
        try {
    
          const data = {
            like: "1",
            created: createddatetime,
            updated: createddatetime,
            id: id,
            ani: params.ani,
          }
    
          console.log("like", data)
          await axios.post(`${backend_url}/api/meme/postlike`, data);
          console.log('post liked', data);
        } catch (error) {
          console.error('Error adding like:', error);
        }
      };


      const deleteLike = async (id, ani) => {
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
      };


  return (
    <div className='font-family'>
            <MemeNav count={params.count} ani={params.ani} service={params.service} />
            <h1 className='text-3xl mt-10 mx-3 md:mx-[45px] uppercase'>{name}</h1>
            <div className='grid font-family grid-cols-2 mt-5 p-3 text-sm md:grid-cols-4 lg:grid-cols-6 gap-4 container mx-auto '>
                {meme?.length === 0 ? (
                    <div className="col-span-full text-center py-10">
                        There is no meme in this category!
                    </div>
                ) : (
                    meme?.map((rand) => {
                        const memeId = rand.id;
                        const isMemeAlreadyLiked = isMemeLiked(memeId);
                        const apiDate = new Date(rand.created_at);
                        
                        const months = [
                            "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
                        ];
                        
                        const day = apiDate.getDate();
                        const month = months[apiDate.getMonth()];
                        const year = apiDate.getFullYear();
                        const formattedDate = `${day} ${month}, ${year}`;

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
                    })
                )}
            </div>
            <MemeFooter/>
        </div>
  )
}

export default MemeCategory
