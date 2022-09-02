import { doc, arrayUnion, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import GuessCard from "../components/GuessCard"
import ResultCard from "../components/ResultCard"
import Rounds from "../components/Rounds"
import { useReroute } from "../hooks/useReroute"

export default function Game({auth, db}) {

    const [color, setColor] = useState()
    const [round, setRound] = useState(1)
    const [end, setEnd] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [rounds, setRounds] = useState([])

    useReroute()

    useEffect(() => { setRandomHex() }, [])

    useEffect(()=>{ 
        if(end){
            
            endGame()
        }
    },[end])

    // Generate random hex color
    function setRandomHex() {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        setColor('#' + n.slice(0, 6))
    }

    // Guess a color
    function handleGuess() {
        // Input is a hex value
        const input = document.getElementById('hexInput').value
        if (input.length !== 6) return

        let diffR = Math.abs(parseInt(color.substring(1, 3), 16) - parseInt(input.substring(0, 2), 16))
        let diffG = Math.abs(parseInt(color.substring(3, 5), 16) - parseInt(input.substring(2, 4), 16))
        let diffB = Math.abs(parseInt(color.substring(5, 7), 16) - parseInt(input.substring(4, 6), 16))
        let sumDiff = Math.sqrt(diffR**2 + diffG**2 + diffB**2)

        // inverse of the total difference
        let score = Math.floor(100 / (0.05 * sumDiff + 1))

        // Append score to total score
        setCurrentScore(currentScore + score)

        // Add round
        setRounds([...rounds, {
            score: score,
            number: round,
            guess: `#${input}`,
            color: color
        }])


        // Check for end of the game
        if (round === 5) {
            setEnd(true)
            return
        }

        // Go to next round
        setRandomHex()
        setRound(round + 1)
    }

    // Store score in database
    async function endGame(){
        // Add new game played for this user in the database
        const userDoc = doc(db, 'users', auth.currentUser.uid)

        await updateDoc(userDoc, {
            gamesPlayed: arrayUnion({
                score:currentScore
            })
        })

    }



    return (
        <div className="max-vh pt-3" style={{ backgroundColor: color }}>
        <div className="container-fluid">
            <div className="row">

                <div className="col-8">
                    <div className="d-flex justify-content-center mt-3">
                    {end ? <ResultCard score={currentScore} /> :
                    <GuessCard handleGuess={handleGuess} color={color} />}
                    </div>
                </div>

                <div className="col">
                        <div>
                            <div className="bg-light rounded">
                                <Rounds rounds={rounds} />
                            </div>
                        </div>
                </div>

            </div>
        </div>
        </div>
    )
}