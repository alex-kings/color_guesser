import { useEffect, useState } from "react"
import { useEventListener } from '../hooks/useEventListener.js'

export default function Game({color, setColor}) {
    const [round, setRound] = useState(1)
    const [currentScore, setCurrentScore] = useState(0)

    useEventListener('keydown',handleKeyDown)
    useEffect(()=>{setRandomHex()},[])

    function handleKeyDown(e){
        if(e.key === 'Enter'){
            let input = document.getElementById('hexInput').value


        }
    }

    // Generate random hex color
    function setRandomHex() {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        setColor('#' + n.slice(0, 6))
    }

    // Guess a color

    return (
        <div>
            <div className="float-right">
                <div className="p-3 col">
                    <div>round {round}</div>
                    <div>score: {currentScore}</div>
                </div>
            </div>
            <div className="absolutely-centered">
                <div className='p-3 card bg-light'>
                    <span className="text-center h4" style={{color:color}}>Guess the color</span>
                    <div className="input-group">
                        <input id='hexInput' type="text" className="form-control text-center" maxLength={6}/>
                        <div className="input-group-append">
                            <button className="btn input-group-append btn-secondary">Ok!</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}