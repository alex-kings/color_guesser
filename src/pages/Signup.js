import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [emailMsg, setEmailMsg] = useState()
    const [passwordMsg, setPasswordMsg] = useState()

    // Check if email has correct form
    function checkEmail(email) {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(email)) {
            console.log('Invalid email address.')
            return false;
        }
        return true
    }

    // Check password
    function checkPassword(password) {
        if (password.length < 6) {
            console.log('Password should be longer!')
            return false
        }
        return true
    }

    // Signup a new user
    function handleSignup() {
        // Get email and password from user
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

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
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;

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
                    <span className="text-secondary float-end">Already have an account? <b className="text-primary">Sign in</b></span>
                </div>
                
                
            </div>
        </div>
    )
}