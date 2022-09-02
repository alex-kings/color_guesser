/**
 * Checks if user is currently connected and re routes to login page if not.
 */

import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function useReroute(){
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(()=>{
        if(auth.currentUser == null) navigate('/login')

    })
}

export {useReroute}