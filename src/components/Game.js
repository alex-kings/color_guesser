import { useEffect, useState } from "react"

export default function Game({color, setColor}) {
    const [round, setRound] = useState(1)
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

        // Test that input is hex!!

        let diffR = Math.abs(parseInt(color.substring(1,3),16) - parseInt(input.substring(0,2),16))
        let diffG = Math.abs(parseInt(color.substring(3,5),16) - parseInt(input.substring(2,4),16))
        let diffB = Math.abs(parseInt(color.substring(5,7),16) - parseInt(input.substring(4,6),16))

        

        // inverse of the total difference
        let score = Math.floor(100/(0.05*(diffR + diffG + diffB) + 1))
        
        setCurrentScore(currentScore + score)
    }

    // Change input length on input change
    function handleInputChange(e){
        setInputLength(e.target.value.length)
    }

    return (
        <div>
            <div className="float-right bg-light p-1 m-1 rounded">
                <div className="col" style={{color:color}}>
                    <div>round {round}</div>
                    <div>score: {currentScore}</div>
                    <button onClick={()=>{console.log(color)}}>cheat</button>
                </div>
            </div>

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
            
        </div>
    )
}