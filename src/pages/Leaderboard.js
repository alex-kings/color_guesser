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
        
        const q = await query(usersCollection, orderBy('highScore'), limit(10))
        const result = await getDocs(q)

        result.forEach((doc)=>{
            highScorers.push(doc.data())
            console.log(doc.data())
        })

        setTopUsers(highScorers)
    }

    return(
        <div>
            {topUsers.map((user,index)=>(
                <div key={index}>
                    {console.log(`hello${user.username}`)}
                    <div>{user.username}: {user.highScore}</div>
                </div>
            ))}
            <button onClick={()=>{console.log(topUsers)}}>click</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>Username</th>
                        <th scope='col'>High score</th>
                    </tr>
                </thead>

            </table>
        </div>
    )
}