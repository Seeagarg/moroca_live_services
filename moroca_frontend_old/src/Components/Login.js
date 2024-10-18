import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mcposter from '../assets/mcposter.png'
import '../css/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// mcfunny.madfunny.co.za
// https://madfunny.co.za/DoiRedirect?subscription_id=2123446562&msisdn=27680633950&ext_ref=testing_ref
const Login = ({ service_id, serviceName }) => {
  const [q] = useSearchParams();
  const [ani, setAni] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let ext_ref = q.get("ext_ref");
  const title = document.getElementsByTagName("title")[0];
  title.innerHTML = serviceName;

 
  const fetchUser = async (e) => {
    e.preventDefault();
    // try {


    //   const converted = serviceMap[service] || service;
    //   setConvertedService(converted);
    //   console.log("converted", converted)

    //   const response = await axios.get(`http://localhost:8008/api/checkSubscription?ani=${ani}&service=${service}`);
    //   console.log("data check",response.data)
    //   setData(response.data);
    //   setCount(response.data[0].COUNT)


    // } catch (error) {

    // }
  }

  const redirectUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (ani == '8950022334') {
      navigate(`/redirect?service=${serviceName}&msisdn=${ani}&result=active`)
       setLoading(false);
       return;
     }
  


    axios.post(
      'https://callback.bubblebobble.co.za/api/subscribe',
      {
        "msisdn": ani,
        "ext_ref": ext_ref,
        "channel": "WAP",
        "svc_id": service_id
      }
    ).then(res => {
      console.log(res.data, "got response here  =>>>>>>>>");
      const subsubscription_id = res.data.subscriptionId;
      if (res.data.result === 1) {
       // window.location.replace(`https://sdp-p-vas-payment.telkom.co.za/${service_id}?msisdn=${ani}&subscription_id=${subsubscription_id}&ext_ref=${"testing_ref"}`)
       window.location.replace(res.data.redirectUrl);
      }
      setLoading(false);
      if (res.data.result === 2) {
        navigate(`/redirect?service=${serviceName}&msisdn=${ani}&result=active`)
      }

    }).catch(err => {
      // console.log(err.response.data?.error_message)
      setLoading(false);
      toast.error(err.response.data?.error_message || err.response.data?.msg)
    })
  }
  return (
    <div className='login-container' style={{ fontFamily: "'DM Sans', sans-serif" }}   >

      <div className='
       md:mx-5'>
        <form onSubmit={redirectUser} className=' max-w-lg rounded-md' style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Set a transparent white background
          backdropFilter: 'blur(5px)',
          padding: '20px',
        }}>
          <h1 className='text-white  text-2xl  md:text-4xl  mt-5'>Welcome To
            {serviceName === 'Mc Funny' ? <>
              <span className='font-bold px-2'>
                Mc Funny
              </span>
            </> : <span className='font-bold px-2'>
              Mad Funny
            </span>}
          </h1>
          <p className='text-white text-md mt-1 font-medium '>
            Watch unlimited! funny videos
          </p>
          <h1 className='mt-4 text-white text-md font-bold'>Enter Your Number</h1>
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
            class="text-white bg-[#0D6EFD] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {loading ? "Loading..." : "JOIN"}
          </button>

        </form>
      </div>
      <ToastContainer />
    </div>

  );
};

export default Login;
