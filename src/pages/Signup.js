import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState()

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
            setErrorMsg(<div>Email address <b>{email}</b> is invalid.</div>)
            return
        }
        
        
        if(!checkPassword(password)) {
            setErrorMsg('Password is not strong enough. Add additional characters including special characters and numbers.')
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
                        setErrorMsg(<div>Email address <b>{email}</b> already in use.</div>)
                        break;
                    case 'auth/invalid-email':
                        setErrorMsg(<div>Email address <b>{email}</b> is invalid.</div>)
                        break;
                    case 'auth/operation-not-allowed':
                        setErrorMsg(`Error during sign up.`)
                        break;
                    case 'auth/weak-password':
                        setErrorMsg('Password is not strong enough. Add additional characters including special characters and numbers.')
                        break;
                    default:
                        console.log(error.message);
                        break;
                }
            })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className='container card mt-5 bg-light p-2 row'>
                <div className="mb-3">
                    <label className="form-label" htmlFor='emailInput'>Email</label>
                    <input className="form-control" id='emailInput' type='text' />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor='passwordInput'>Password</label>
                    <input className="form-control" id='passwordInput' type='password' />
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSignup}>register</button>
                    {errorMsg ? <div className="alert alert-danger mx-2">{errorMsg}</div> : null}
                </div>
            </div>
        </div>
    )
}