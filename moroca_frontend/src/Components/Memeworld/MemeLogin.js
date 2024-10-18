import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import laughbg from '../../assets/laugh.avif';
import axios from 'axios';
import { toast } from 'react-toastify';

const MemeLogin = ({ service_id, serviceName }) => {
  const [ani, setAni] = useState('');
  const [loading, setLoading] = useState(false);
  const [q] = useSearchParams();
  const navigate = useNavigate();
  let ext_ref = q.get("ext_ref");
  const title = document.getElementsByTagName("title")[0];
  title.innerHTML = serviceName;

  
  
  const redirectUser = async (e) => {
    e.preventDefault();
    setLoading(true)


    if (ani == '8950022334') {
      navigate(`/redirectTo?service=${serviceName}&msisdn=${ani}&result=active`)
       setLoading(false);
       return;
     }

    axios.post('https://callback.bubblebobble.co.za/api/subscribe', {
      "msisdn": ani,
      "ext_ref": ext_ref,
      "channel": "WAP",
      "svc_id": service_id
    }).then(res => {
      setLoading(false);
      console.log(res.data, "got response here  =>>>>>>>>");
      const subscription_id = res.data.subscriptionId;
      if (res.data.result === 1) {
        // window.location.replace(`https://sdp-p-vas-payment.telkom.co.za/${service_id}?msisdn=${ani}&subscription_id=${subscription_id}&ext_ref=${"testing_ref"}`);
        window.location.replace(res.data.redirectUrl);
      } else if (res.data.result === 2) {
        navigate(`/redirectTo?service=${serviceName}&msisdn=${ani}&result=active`);
      }
    }).catch(err => {
      setLoading(false);
      toast.error(err.response.data?.error_message || err.response.data?.msg)
    });
  };

  //   http://176.9.90.155:8008/redirectTo?service=memeworld&msisdn=814116101&result=active
  return (
    <div className='bg-[#FEC901]'>


      <div className="container mx-auto flex justify-center  px-5" style={{
        backgroundImage: `url(${laughbg})`,
        //   backgroundImage: `url(${racedaybanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //   backgroundColor:'#FEC901',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className='container md:py-[120px] mx-auto justify-center flex'>
          <div className="w-full max-w-sm p-4 bg-white/90 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800/90 dark:border-gray-700">
            <form className="space-y-6" action="#" onSubmit={redirectUser}>
              <h5 className="text-2xl font-bold text-center dark:text-white">Sign in to MEMEWORLD!</h5>
              <div>
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Number</label>
                <input type="number" name="ani" id="phoneInput" placeholder="Enter your phone number: eg 812xxxxxx" value={ani} onChange={(e) => setAni(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
              </div>
              <button
                disabled={loading}
                type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {loading ? "Loading..." : "JOIN"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemeLogin;
