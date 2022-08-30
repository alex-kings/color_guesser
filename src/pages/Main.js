import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Game from "../components/Game"

export default function Main({auth}){
    const navigate = useNavigate()
    const [started, setStarted] = useState()
    const [color,setColor] = useState()

    // useEffect(()=>{
    //     // User needs to be authenticated to go to main page
    //     if(auth.currentUser == null) navigate('/login')
    // })

    

    // Start the game
    function start(){
        setStarted(true)
    }

    return(
        <div className='max-vh' style={{backgroundColor:color}}>
            <button className="btn btn-primary btn-lg absolute-center" onClick={start}>Start</button>
            {started ? <Game setColor={setColor} color={color}/> : null}
        </div>
        
    )
}