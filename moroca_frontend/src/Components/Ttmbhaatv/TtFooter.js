import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const TtFooter = ({service}) => {

  return (

    <div>
      <div className=' rounded-sm container mx-auto bg-[#2F88C5] '>

    <p className=' text-center py-5 text-white uppercase font-bold w-full h-[60px] '>2024 ©{service
    } | 
       {service=='ttmbhatv' ?   <Link to='/ttbhaTerms'> Privacy Policy</Link>:   <Link to='/raceday-terms'> Privacy Policy</Link> }
 </p>
      </div>
    </div>
  )
}

export default TtFooter
