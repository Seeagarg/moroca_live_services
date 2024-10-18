import React, { useEffect, useState } from 'react'
import memelogo from '../../assets/memelogo.png'
import axios from 'axios'
import '../Meme.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaCaretDown,FaTimes } from 'react-icons/fa'
import { backend_url } from '../../Services/api'

const MemeNav = ({ count, ani, service }) => {
  const [categories, setCategories] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchCatgeories = async () => {


    try {
      const response = await axios.get(`${backend_url}/api/meme/getMemeCategories`);
      setCategories(response.data);
      console.log("categories", response.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchCatgeories()
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = async (id) => {


    if (count == '1') {
      setIsMobileMenuOpen(false)
      setIsDropdownOpen(false)
      navigate(`/memeCategory/${count}/${id}/${ani}/${service}`)
    }
    if (count == '0') {
      window.open('http://optin.telkomsdp.co.za/service/122?cid=700011', '_blank');
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
  <nav class="bg-black border-gray-200 font-family dark:bg-black">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div class="flex items-center">
        <Link to={`/redirectTo?service=${service}&msisdn=${ani}&result=active`}>
            <a class="flex items-center">
              <img src={memelogo} class="h-[60px] mr-3" alt="Flowbite Logo" />
            </a>
          </Link>
          <div class="hidden w-full mx-10 md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black dark:bg-black md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to={`/redirectTo?service=${service}&msisdn=${ani}&result=active`}>
                  <a href="#" class="block py-2 pl-3 pr-4 text-sm text-white bg-blue-700 rounded md:bg-transparent md:text-[#E0BF0A] md:p-0 dark:text-white md:dark:text-blue-500 md:hover:text-red-500">HOME</a>
                </Link>
              </li>
              <li className="dropdown-container">
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded text-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={toggleDropdown}
                >
                  <div className='flex'>
                  CATEGORIES
                  <FaCaretDown className="ml-1 mt-1" />
                  </div>
                
                </a>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-[200px] mt-2 bg-white border rounded shadow-md">
                    <ul>
                      {categories.map((category) => (
                        <li onClick={() => handleClick(category.id)} key={category.id} className="px-4 py-2 hover:bg-gray-200">
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-sm text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">UPLOAD</a>
              </li>
            </ul>
          </div>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"
          onClick={toggleMobileMenu}>
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
    </nav>

    {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-[250px] h-full bg-black z-50 transition-transform transform translate-x-0">
          <button onClick={toggleMobileMenu} className="p-4">
            <FaTimes className="text-white" />
          </button>
          <ul className='text-white px-5'>
            <li className="py-2 text-[#E0BF0A]">
              <Link to={`/redirectTo?service=${service}&msisdn=${ani}&result=active`}>HOME</Link>
            </li>
            <li className="py-2 text-[#E0BF0A]">
              <a onClick={toggleDropdown}>
                <div className='flex'>
                CATEGORIES
                <FaCaretDown className="ml-1 mt-1" />
                </div>
        
                {isDropdownOpen ? (
                  <div>
                    <ul className="mt-2 bg-black text-white border border-gray-200">
                      {categories.map((category) => (
                        <li onClick={() => handleClick(category.id)} key={category.id} className="px-4 py-2 hover:bg-[#E0BF0A]">
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </a>
            </li>
            <li className="py-2 text-[#E0BF0A]">
              <a>UPLOAD</a>
            </li>
          </ul>
        </div>
      )}

    </>
  )
}

export default MemeNav
