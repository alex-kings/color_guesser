import { useState } from "react"

export default function GuessCard({handleGuess, color}) {
    const [inputLength, setInputLength] = useState(0)
    const [errorMsg, setErrorMsg] = useState()
    const RegExp = /^[0-9A-F]{6}$/i;

    // Change input length on input change
    function handleInputChange(e){
        setInputLength(e.target.value.length)
    }

    // Handle click on button
    function handleClick(){
        // Check that the hex value entered is valid
        if(RegExp.test(document.getElementById('hexInput').value)){
            handleGuess()
            setErrorMsg()
        }

        else{
            setErrorMsg('Invalid hexadecimal value!')
        }

    }

    return (
        <div className='p-3 card bg-light' style={{width:'18rem'}}>
            <span className="text-center h4" style={{ color: color }}>Guess the color</span>
            <div className="input-group">
                <input onChange={handleInputChange} id='hexInput' type="text" className="form-control text-center" maxLength={6} />
                <div className="input-group-append">
                    <button onClick={handleClick} className={inputLength === 6 ? 'btn btn-secondary' : 'btn btn-secondary disabled'}>Ok!</button>
                </div>
            </div>
            <div className="text-warning text-center pt-1">{errorMsg}</div>
        </div>
    )
}