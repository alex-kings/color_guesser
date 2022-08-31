export default function Rounds({rounds}){


    return(
        
            <div className="col small">
                {rounds.map(round=>(
                    <div key={round.number} className="bg-light">
                        <div className="row">
                            <div>{round.number}</div>
                            <div>{round.color},#{round.guess}</div>
                        </div>
                    </div>
                ))}
            </div>
        
    )
}