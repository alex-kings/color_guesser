import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Game() {
    const navigate = useNavigate()

    const [color,setColor] = useState()
    const [round, setRound] = useState(1)
    const [end, setEnd] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [inputLength, setInputLength] = useState(0)

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

    // Change input length on input change
    function handleInputChange(e){
        setInputLength(e.target.value.length)
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
                <div className="bg-light p-3 rounded">
                    <div className="col">
                        <div className="mb-3 h5">Final score: {currentScore}</div>
                        <button onClick={()=>{navigate('/main')}} className="row btn btn-outline-primary">back to main page</button>
                    </div>
                </div>
            </div>
            : 
            <div className="absolutely-centered">
                <div className='p-3 card bg-light'>
                    <span className="text-center h4" style={{color:color}}>Guess the color</span>
                    <div className="input-group">
                        <input onChange={handleInputChange} id='hexInput' type="text" className="form-control text-center" maxLength={6}/>
                        <div className="input-group-append">   
                            <button onClick={handleGuess} className={inputLength === 6 ? 'btn btn-secondary' : 'btn btn-secondary disabled'}>Ok!</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}