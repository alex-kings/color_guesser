export default function SignIn(){
    async function handleSignIn(){
        // Send email and password to backend
        const data = {
            email:document.getElementById('emailInput').value,
            password:document.getElementById('passwordInput').value
        }
        console.log('sending: ',data)

        const response = await fetch("http://localhost:5000/sign-in", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        })

        console.log('sent! ')
        const result = await response.json()
        console.log(result)
    }

    return(
        <div className='full-screen center'>
            <div className='col'>
                <input id='emailInput' type='text' placeholder='email'/>
                <input id='passwordInput' type='password' placeholder='password'/>
                <button onClick={handleSignIn}>sign in</button>
            </div>
        </div>
    )
}