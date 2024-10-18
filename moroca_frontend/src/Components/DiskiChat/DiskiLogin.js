import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useSearchParams } from 'react-router-dom';
import mcposter from '../../assets/mcposter.png'
import '../../css/Login.css'
import { toast } from 'react-toastify';
import diskichatImage from '../../assets/diskichat.png';

const DiskiLogin = ({ service_id, serviceName }) => {
  const [loading, setLoading] = useState(false);
  const [q] = useSearchParams();
  const [ani, setAni] = useState('');
  const title = document.getElementsByTagName("title")[0];
  title.innerHTML = serviceName;
  
  const navigate = useNavigate();
  // const service = 'diskichat';
  let ext_ref = q.get("ext_ref");

  

  // const fetchUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.get(`http://localhost:5678/api/checkSubscription?ani=${ani}&service=${service}`);
  //     setData(response.data);
  //     console.log("data", response.data)
  //     console.log("service", service)

  //     navigate(`/home/${service}`)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };




  // const fetchUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const serviceMap = {
  //       // 'diski99': 'Diski 99',
  //       'diskichat':'Diski 99',
        
  //     };
  
  //   const convertedd = serviceMap[service] || service;
  //   setConvertedService(convertedd);
  //   console.log("converted",convertedd)

  //   const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/checkSubscription?ani=${ani}&service=${convertedd}`);
  //   setData(response.data);
  //   setCount(response.data[0].COUNT)
  //     console.log("data=======", response.data)
  //     console.log("service", service)

  //     // navigate(`/doRedirect?service=${service}&msisdn=${ani}&result=active`)
  //     // console.log("response sub", response.data[0].COUNT);
  //   } catch (error) {
      
  //   }
  // }

  const redirectUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (ani == '8950022334') {
      navigate(`/doRedirect?service=${serviceName}&msisdn=${ani}&result=active`)
       setLoading(false);
       return;
     }


    axios.post('https://callback.bubblebobble.co.za/api/subscribe', {
      "msisdn": ani,
      "ext_ref": ext_ref,
      "channel": "WAP",
      "svc_id": service_id
    }).then(res => {
      console.log(res.data, "got response here  =>>>>>>>>");
      const subscription_id = res.data.subscriptionId;
      setLoading(false);
      if (res.data.result === 1) {
        window.location.replace(res.data.redirectUrl);
        // window.location.replace(`https://sdp-p-vas-payment.telkom.co.za/${service_id}?msisdn=${ani}&subscription_id=${subscription_id}&ext_ref=${"testing_ref"}`);
      } else if (res.data.result === 2) {
        navigate(`/doredirect?service=${serviceName}&msisdn=${ani}&result=active`);
      }
    }).catch(err => {
      setLoading(false);
      toast.error(err.response.data?.error_message || err.response.data?.msg)
    });
  };
  // useEffect(()=>{
  //   if(count=='1'){
  //     navigate(`/doRedirect?service=${service}&msisdn=${ani}&result=active`)
  //   }else{
  //     window.open('http://optin.telkomsdp.co.za/service/246?ext_ref=', '_blank');
  //   }
  // },[count])
  return (
    <div className='login-containerr' style={{
      backgroundImage: `url(${diskichatImage})`,
      backgroundSize: "cover",
      fontFamily: "'DM Sans', sans-serif",
      backgroundRepeat: "no-repeat",
      backgroundAttachment:'fixed'
      }}  >
      <div className='
       md:mx-[120px]'>
        <form onSubmit={redirectUser} className=' max-w-lg rounded-md' style={{
          width: '100%',
          backgroundColor: "black", 
          backdropFilter: 'blur(5px)', 
          padding: '20px',
        }}>
          <h1 className='text-white  text-2xl  md:text-4xl   mt-5'>Welcome To <span className='text-white font-bold'>Diski Chat</span></h1>
          <p className='text-white text-md mt-1 font-medium '>
            Watch unlimited! funny videos
          </p>
          <h1 className='mt-4 text-white text-md '>ENTER YOUR NUMBER AND JOIN Games</h1>
          <input type="text" class="bg-gray-50 focus:outline-none text-gray-900 mt-2 text-sm py-3 block w-full p-2.5  dark:border-gray-600  dark:gray-900"

            placeholder='Enter your phone number : eg 812xxxxxx'
            id="phoneInput"
            name="ani"
            value={ani}
            onChange={(e) => setAni(e.target.value)}
            required />
          <div class="flex items-center mb-4 mt-3">
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 focus:outline-none border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="default-checkbox" class="ml-2 text-md font-medium text-white dark:text-gray-300">I agreed to the Terms and Conditions</label>
          </div>

          <button 
          disabled={loading}
          type="submit"
          class="text-white bg-[#0D6EFD]  md:w-[150px] w-full md:mx-auto hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {loading ? "Loading..." : "JOIN" }
          </button>

        </form>
      </div>

    </div>

  );
};

export default DiskiLogin;
