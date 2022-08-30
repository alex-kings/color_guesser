import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Main({auth}){
    const navigate = useNavigate()
    useEffect(()=>{
        // User needs to be authenticated to go to main page
        if(auth.currentUser == null) navigate('/login')
    })

    return(
        <div>
            Main page
        </div>
    )
}