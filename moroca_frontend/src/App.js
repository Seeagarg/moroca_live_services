import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import SingleVideo from './Components/SingleVideo'
import HomeVideo from './Components/HomeVideo'
import MemeHome from './Components/Memeworld/MemeHome'
import TtHome from './Components/Ttmbhaatv/TtHome'
import MemeTerms from './Components/Memeworld/MemeTerms'
import SingleTTVideo from './Components/Ttmbhaatv/SingleTTVideo'
import TtCategory from './Components/Ttmbhaatv/TtCategory'
import MemeCategory from './Components/Memeworld/MemeCategory'
import DiskiLogin from './Components/DiskiChat/DiskiLogin'
import DiskiHome from './Components/DiskiChat/DiskiHome'
import DiskiArtistVideo from './Components/DiskiChat/DiskiArtistVideo'
import DiskiSingle from './Components/DiskiChat/DiskiSingle'
import TtTerms from './Components/Ttmbhaatv/TtTerms'
import RacedayTerms from './Components/Ttmbhaatv/RacedayTerms'
import DoiRedirect from './Components/DoiRedirect'
import RacedayLogin from './Components/Ttmbhaatv/RacedayLogin'
import MemeLogin from './Components/Memeworld/MemeLogin'
import TTLogin from './Components/Ttmbhaatv/TTLogin'
import 'react-toastify/dist/ReactToastify.css';

// import TTSingleVideo from './Components/Ttmbhaatv/TTSingleVideo'

// const RouteHandler = () => {
//   const navigate = useNavigate();
//   const hostname = window.location.hostname;
//   const subdomain = hostname.split('.')[0];
//   console.log("host domain", hostname,subdomain)

//   useEffect(() => {
//     if (subdomain === 'memeworld') {
//       navigate('/redirectTo');
//     } else if (hostname === 'ttmbhatv.com' || hostname === 'racedaytv.com') {
//       navigate('/DoiRedirect');
//     }
//     // Add more conditions if needed
//   }, [subdomain, hostname, navigate]);

//   return null; // This component doesn't render anything, it's just for handling the routing logic
// }

const App = () => {
  const hostname = window.location.host;
  console.log(hostname)
  // let subdomain = hostname.replace("demo.", "").split('.')[0];
  // console.log(subdomain)
  // console.log("location.....", window.location)
  const subdomain = 'madfunny'
  
  const domainMap = {
    diskichat: <DiskiLogin 
    service_id={"151"} 
    serviceName={"Diski Chat"}
    />,
    ttmbhatv: <TTLogin 
    service_id={"152"} 
    serviceName={"ttmbhatv"}
    />,
    racedaytv: <RacedayLogin 
    service_id={"149"}
    serviceName={"RaceDayTV"}
    />,
    memeworld: <MemeLogin
    service_id={"122"}
    serviceName={"Meme World"}
    />,
    mcfunny: <Login 
    service_id={"248"}
    serviceName={"Mc Funny"} 
    />,
    madfunny: <Login 
    service_id={"150"} 
    serviceName={"Mad Funny"} 
    />,
   
    
  };


  const HomeMap = {
    diskichat: <DiskiHome service='diskichat' />,
    ttmbhatv: <TtHome service='ttmbhatv' />,
    racedaytv: <TtHome service='racedaytv' />,
    memeworld: <MemeHome
    service='memeworld'
    />,
    mcfunny: <Home service='MC Funny' />,
    madfunny: <Home service='Mad Funny' />,
   
    
  };

  const getRootComponent = () => {
    // return domainMap[subdomain];
    return HomeMap[subdomain];
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={getRootComponent()} />
          <Route path='/login' element={<Login />} />
          <Route path={'/DoiRedirect'} element={<DoiRedirect />} />
          <Route path='/diskilogin' element={<DiskiLogin />} />
          <Route path='/redirect' element={<Home />} />
          <Route path='/doRedirect' element={<DiskiHome />} />
          <Route path='/racedaylogin' element={<RacedayLogin />} />
          <Route path='/memelogin' element={<MemeLogin />} />
          <Route path='/ttlogin' element={<TTLogin service_id={"152"} serviceName={"ttmbhatv"}/>}/>

          <Route path='/artistvideos/:id/:service/:count' element={<DiskiArtistVideo />} />
          <Route path='/diskisingle/:id/:service/:mid' element={<DiskiSingle />} />
          <Route path='/video/:id/:service/:mid' element={<SingleVideo />} />
          <Route path='/allvideos/:id/:service/:count' element={<HomeVideo />} />
          <Route path='/allvideos/:id/:service' element={<HomeVideo />} />

          <Route path='/redirectTo' element={<MemeHome service='memeworld' />} />
          <Route path='/memeCategory/:count/:id/:service' element={<MemeCategory />} />
          <Route path='/ttredirect' element={<TtHome service='raceday' />} />
          <Route path='/terms' element={<MemeTerms />} />
          <Route path='/ttsingle/:id/:service' element={<SingleTTVideo />} />
          <Route path='/ttcategory/:cat/:service' element={<TtCategory />} />
          <Route path='/ttbhaTerms' element={<TtTerms />} />
          <Route path='/raceday-terms' element={<RacedayTerms />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
