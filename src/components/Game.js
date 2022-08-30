import { useEffect, useState } from "react"
import { useEventListener } from '../hooks/useEventListener.js'

export default function Game({color, setColor}) {
    const [round, setRound] = useState(0)

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
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><div>#</div></span>
                </div>
                <input id='hexInput' type="text" className="form-control"/>
            </div>
        </div>
    )
}