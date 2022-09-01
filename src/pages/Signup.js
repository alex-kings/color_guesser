import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEventListener } from "../hooks/useEventListener"
import {doc, setDoc} from 'firebase/firestore'

export default function Signup({auth, db}) {
    const navigate = useNavigate()
    const [emailMsg, setEmailMsg] = useState()
    const [passwordMsg, setPasswordMsg] = useState()
    const [usernameMsg, setUsernameMsg] = useState()

    // Allow user to sign up by pressing enter
    useEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            handleSignup()
        }
    })

    // Check if email has correct form
    function checkEmail(email) {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return(filter.test(email))
    }

    // Check password
    function checkPassword(password) {
        return(password.length > 5)
    }

    // Signup a new user
    function handleSignup() {
        // Get email and password from user
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value
        const username = document.getElementById('usernameInput').value

        // Check username was entered
        if(username.length === 0) {
            setUsernameMsg('A username is required')
        }

        // Check if email and password have correct format
        if (!checkEmail(email)){
            setEmailMsg(<div><b>{email}</b> is invalid.</div>)
            return
        }
        
        
        if(!checkPassword(password)) {
            setPasswordMsg('Password requires more characters.')
            return
        }


        // Create account with firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                // Create a new user in user table with the uid just generated

                // AWAIT??
                setDoc(doc(db, 'users', userCredential.user.uid), {
                    username: username,
                    gamesPlayed:[]
                });

                navigate('/main')
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setEmailMsg(<div><b>{email}</b> already in use.</div>)
                        break;
                    case 'auth/invalid-email':
                        setEmailMsg(<div><b>{email}</b> is invalid.</div>)
                        break;
                    case 'auth/operation-not-allowed':
                        setEmailMsg(`Error during sign up.`)
                        break;
                    case 'auth/weak-password':
                        setPasswordMsg('Password is not strong enough. Add additional characters including special characters and numbers.')
                        break;
                    default:
                        console.log(error.message);
                        break;
                }
            })
    }

    return (
        <div className="d-flex justify-content-center px-2">
            <div className='container card mt-5 bg-light p-2 row'>
                <div className="d-flex justify-content-center">
                    <h4>Sign up</h4>
                </div>
                <div className="mb-3">
                    <div className="form-label">Name</div>
                    <input className="form-control" id='usernameInput' type='text' />
                    {usernameMsg? <span className="text-danger float-end">{usernameMsg}</span>:null}
                </div>
                <div className="mb-3">
                    <div className="form-label">Email</div>
                    <input className="form-control" id='emailInput' type='text' />
                    {emailMsg? <span className="text-danger float-end">{emailMsg}</span>:null}
                </div>
                <div className="mb-3">
                    <div className="form-label">Password</div>
                    <input className="form-control" id='passwordInput' type='password' />
                    {passwordMsg? <span className="text-danger float-end">{passwordMsg}</span> : null}
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSignup}>register</button>
                    
                </div>
                <div>
                    <span className="text-secondary float-end">Already have an account? <b className="text-primary pointer" onClick={()=>{navigate('/login')}}>Sign in</b></span>
                </div>
                
                
            </div>
        </div>
    )
}