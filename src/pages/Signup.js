import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup(){

    // Signup a new user
    function handleSignup(){
        // Get email and password from user
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

        console.log('Creating account: ', email, password)
        // Check email and password have correct format...
        //...

        // Create account with firebase
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    return(
        <div className='full-screen center'>
            <div className='col'>
                <input id='emailInput' type='text' placeholder='email'/>
                <input id='passwordInput' type='password' placeholder='password'/>
                <button onClick={handleSignup}>sign in</button>
            </div>
        </div>
    )
}