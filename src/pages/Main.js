import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Main({auth}){
    const navigate = useNavigate()

    // useEffect(()=>{
    //     // User needs to be authenticated to go to main page
    //     if(auth.currentUser == null) navigate('/login')
    // })

    
    // Start the game
    function start(){
        navigate('/game')
    }

    return(
        <div className='max-vh'>
            <button className="btn btn-primary btn-lg absolute-center" onClick={start}>Start</button>
        </div>
        
    )
}