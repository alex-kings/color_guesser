export default function ProfileCard({ user }) {

    // Return the user's best score
    function bestScore(){
        let highScore = 0
        user.gamesPlayed.forEach((game)=>{
            if(game.score > highScore){
                highScore = game.score
            }
        })
        return highScore
    }

    return (
        <div className="jumbotron m-3 text-center">
            <h2 className="pb-3">Your profile</h2>
            {user == null ?
                null
                :
                <>
                    <h5>username: <span className="text-info">{user.username}</span></h5>
                    <h5>email: <span className="text-info">{user.email}</span></h5>
                    <h5>games played: <span className='text-info'>{user.gamesPlayed.length}</span></h5>
                    <h5>highest score: <span className='text-info'>{bestScore()}</span></h5>
                </>

            }
        </div>
    )
}