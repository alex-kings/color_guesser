export default function Login(){
    function handleLogin(){
        console.log(document.getElementById('emailInput').value)
        console.log(document.getElementById('passwordInput').value)
    }

    return(
        <div className='full-screen center'>
            <div className='col'>
                <input id='emailInput' type='text' placeholder='email'/>
                <input id='passwordInput' type='password' placeholder='password'/>
                <button onClick={handleLogin}>handleLogin</button>
            </div>
        </div>
    )
}