import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup(){

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
    function checkPassword(password){
        if(password.length < 6){
            console.log('Password should be longer!')
            return false
        }
        return true
    }

    // Signup a new user
    function handleSignup(){
        // Get email and password from user
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

        // Check if email and password have correct format
        if(!checkEmail(email) || !checkPassword(password)){
            return
        }
        

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