import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useReroute } from "../hooks/useReroute";

export default function Leaderboard({db}){

    const [topUsers, setTopUsers] = useState([])
    useReroute()

    // Load high scores
    useState(()=>{
        loadHighScores()
    })

    async function loadHighScores(){
        const highScorers = []
        const usersCollection = collection(db, 'users')
        
        const q = await query(usersCollection, orderBy('highScore', 'desc'), limit(10))
        const result = await getDocs(q)

        result.forEach((doc)=>{
            highScorers.push(doc.data())
            console.log(doc.data())
        })

        setTopUsers(highScorers)
    }

    return(
        <div className="container w-50 mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>High score</th>
                    </tr>
                </thead>
                {}
                <tbody>
                    {topUsers.map((user,index)=>(
                    <tr key={index}>
                        <th scope='row'>{index+1}</th>
                        <td>{user.username}</td>
                        <td>{user.highScore}</td>
                    </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}