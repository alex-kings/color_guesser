import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Root(){
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('Redirecting to login')
        navigate('/Color_Guesser/login')
    })

    return(
        <div></div>
    )
}