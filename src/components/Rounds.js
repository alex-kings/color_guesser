import ColorBox from "./ColorBox";

export default function Rounds({rounds}){
    return(
        <div className="container small">
            {rounds.map(round=>(
                <div key={round.number} className="bg-light">
                    <div className="pb-2">
                        <div className="row justify-content-between">
                            <div className="col-md-auto">Round {round.number}</div>
                            <div className="col-md-auto text-right">Score: {round.score}</div>
                        </div>
                        <div className="row">
                            <div className="col"><ColorBox text='Color: ' color={round.color}/></div>
                            <div className="col"><ColorBox text='Guess: ' color={round.guess}/></div>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}