import { useState } from "react"

export default function GuessCard({handleGuess, color}) {
    const [inputLength, setInputLength] = useState(0)

    // Change input length on input change
    function handleInputChange(e){
        setInputLength(e.target.value.length)
    }
    return (
        <div className='p-3 card bg-light'>
            <span className="text-center h4" style={{ color: color }}>Guess the color</span>
            <div className="input-group">
                <input onChange={handleInputChange} id='hexInput' type="text" className="form-control text-center" maxLength={6} />
                <div className="input-group-append">
                    <button onClick={handleGuess} className={inputLength === 6 ? 'btn btn-secondary' : 'btn btn-secondary disabled'}>Ok!</button>
                </div>
            </div>
        </div>
    )
}