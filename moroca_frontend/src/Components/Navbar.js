import axios from 'axios';
import React , {useState,useEffect} from 'react'
import { backend_url } from '../Services/api';
const Navbar = ({service}) => {
console.log("service=======",service)
    const [artists, setArtists] = useState([]);
  const [videos,setVideos]=useState([])

    
  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/fetchArtist?service=${service}`);
      setArtists(response.data);
      // console.log('data', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);




  const fetchVideos=async(id)=>{
    try {
      const response=await axios.get(`${backend_url}/api/fetchVideos/${id}`)
      console.log("videos",response.data);
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  }
 

  return (
    <>
    <nav class="bg-white sticky top-0 z-50 opacity-60">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a class="flex items-center">
      
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mc Funny</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block text-md py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>

        {artists.map((person) => (
                <li key={person.id}>
                  <a onClick={()=>fetchVideos(person.id)}
                    href="#"
                    className="block text-md py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {person.artist}
                  </a>
                </li>
              ))}



        
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
