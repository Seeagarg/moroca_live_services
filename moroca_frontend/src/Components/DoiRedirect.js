import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

const DoiRedirect = () => {
    const [loading, setLoading]  = useState(true);
    const [q] = useSearchParams();
    const nav = useNavigate();
    let msisdn = q.get("msisdn");
    let subscription_id = q.get("subscription_id");
    let ext_ref = q.get("ext_ref");
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
   
    // const subdomain='racedaytv'
    
    axios.get(
        `https://callback.bubblebobble.co.za/api/subscribe/check-sub?msisdn=${msisdn}&subscription_id=${subscription_id}`
    ).then(resp => {
        const data = resp.data;
        console.log("check-data =>", data);
        setLoading(false)
        if(data.result == 1) {
         console.log("subdomain", subdomain)

            if(subdomain=="mcfunny" || subdomain== "madfunny"){

            nav(`/redirect?service=${subdomain}&msisdn=${msisdn}&result=active`)
            }
            else if(subdomain=='memeworld'){
                nav(`/redirectTo?service=${subdomain}&msisdn=${msisdn}&result=active`)
            }

            else if(subdomain=='racedaytv' || subdomain=='ttmbhatv'){
                console.log(`in ${subdomain}`)
                nav(`/ttredirect?service=${subdomain}&msisdn=${msisdn}&result=active`)
            }
            else if(subdomain=='diskichat'){
                console.log("hereeeeeewwwwwwwwwwwwwwwwww")
                nav(`/doRedirect?service=${subdomain}&msisdn=${msisdn}&result=active`)
            }
            else{
                nav('/')
            }
        }

        else{
            nav('/')
        }
        
       
    }).catch(e => {
        setLoading(false);
        nav("/")
    })
    if(loading) return <h1>redirecting....</h1>
}

export default DoiRedirect
