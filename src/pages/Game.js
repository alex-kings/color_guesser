import { useEffect, useState } from "react"
import GuessCard from "../components/GuessCard"
import ResultCard from "../components/ResultCard"

export default function Game() {
    

    const [color,setColor] = useState()
    const [round, setRound] = useState(1)
    const [end, setEnd] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    

    useEffect(()=>{setRandomHex()},[])

    

    // Generate random hex color
    function setRandomHex() {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        setColor('#' + n.slice(0, 6))
    }

    // Guess a color
    function handleGuess() {
        // Input is a hex value
        const input = document.getElementById('hexInput').value
        if(input.length != 6)return

        let diffR = Math.abs(parseInt(color.substring(1,3),16) - parseInt(input.substring(0,2),16))
        let diffG = Math.abs(parseInt(color.substring(3,5),16) - parseInt(input.substring(2,4),16))
        let diffB = Math.abs(parseInt(color.substring(5,7),16) - parseInt(input.substring(4,6),16))

        

        // inverse of the total difference
        let score = Math.floor(100/(0.05*(diffR + diffG + diffB) + 1))
        
        // Append score to total score
        setCurrentScore(currentScore + score)
        
        // Check for end of the game
        if(round === 5){
            setEnd(true)
            return
        }

        // Go to next round
        setRandomHex()
        setRound(round + 1)
    }

    

    return (
        <div className="max-vh" style={{backgroundColor:color}}>
            <div className="float-right bg-light p-1 m-1 rounded">
                <div className="col" style={{color:color}}>
                    <div>round {round}</div>
                    <div>score: {currentScore}</div>
                </div>
            </div>

            {end? 
            <div className="absolutely-centered">
                <ResultCard score={currentScore}/>
            </div>
            : 
            <div className="absolutely-centered">
                <GuessCard handleGuess={handleGuess} color={color}/>
            </div>
            }
            
        </div>
    )
}