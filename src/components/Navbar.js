import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()

    return(
        <div className="p-2 bg-primary text-white">
            <i onClick={()=>{navigate('/main')}} className="pr-2 bi bi-house-door pointer"></i>
            <i onClick={()=>{navigate('/leaderboard')}} className="bi bi-trophy pointer"></i>
        </div>
    )
}