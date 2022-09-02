import { useNavigate } from "react-router-dom"
//import { useEffect } from "react"
import {useReroute} from '../hooks/useReroute.js'

export default function Main({auth}){
    const navigate = useNavigate()

    // useEffect(()=>{
    //     // User needs to be authenticated to go to main page
    //     if(auth.currentUser == null) navigate('/login')
    // })

    useReroute()

    
    // Start the game
    function start(){
        navigate('/game')
    }

    return(
        <div className="m-3">
            <div className="row">
                <div className="col-8">
                    <button className="btn btn-primary btn-lg absolute-center" onClick={start}>Play!</button>
                    
                </div>
                <div className="col text-right">
                    <u onClick={()=>{navigate('/leaderboard')}} className="text-info pointer">leaderboard</u>
                </div>
            </div>
        </div>
        
    )
}