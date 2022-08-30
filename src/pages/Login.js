import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEventListener } from "../hooks/useEventListener"
import { useState } from 'react'

export default function Login({auth}){
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState()

    // Allow user to login by pressing enter
    useEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            handleLogin()
        }
    })


    // User login
    function handleLogin(){
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            //const user = userCredential.user;
            navigate('/main')
        })
        .catch((error) => {
            setErrorMsg('Email or password incorrect.')
        });
    }

    return(
        <div className="d-flex justify-content-center px-2">
            <div className='container card mt-5 bg-light p-2 row'>
                <div className="d-flex justify-content-center">
                    <h4>Login</h4>
                </div>
                <div className="mb-3">
                    <div className="form-label">Email</div>
                    <input className="form-control" id='emailInput' type='text' />
                </div>
                <div className="mb-3">
                    <div className="form-label">Password</div>
                    <input className="form-control" id='passwordInput' type='password' />
                    {errorMsg?<div className="mt-2 text-danger">{errorMsg}</div> : null}
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleLogin}>sign in</button>
                </div>
                <div>
                    <span className="text-secondary float-end">Don't have an account? <b className="text-primary pointer" onClick={()=>{navigate('/signup')}}>Register</b></span>
                </div>
                
                
            </div>
        </div>
    )
}