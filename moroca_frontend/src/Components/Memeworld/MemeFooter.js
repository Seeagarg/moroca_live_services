import React from 'react'
import logo from '../../assets/memelogo.png'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom'
const MemeFooter = () => {
  return (
    <div className='bg-black flex flex-col mt-10 justify-center'>
        <div className='flex justify-center '>
      <img src={logo} className='w-40' />
     
        </div>
        <div className='flex flex-row justify-center items-center mt-3 space-x-2'>
    <div className='flex items-center'>
        <Link to='/terms'>
            <p className='text-[#E0AD04] mt-1.5 text-sm'>Terms and Conditions</p>
        </Link>
    </div>
    <div className='flex items-center'>
        <p className='text-[#E0AD04] text-xs md:text-sm'>
            <span className='text-white text-xl'>x </span> Want to unsubscribe
        </p>
    </div>
    <div className='flex items-center'>
        <p className='text-[#E0AD04] text-xs md:text-sm'>
            <span className='text-white text-xl'>x </span>
            <a href="mailto:help@bubblebobble.co.za" className='text-[#E0AD04] hover:underline'>
                help@bubblebobble.co.za
            </a>
        </p>
    </div>
</div>

        <p className='text-white mt-4 text-center mb-10'>
      © 2023 Meme World. All Rights Reserved.
      </p>
    </div>
  )
}

export default MemeFooter
