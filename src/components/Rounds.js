import ColorBox from "./ColorBox";

export default function Rounds({rounds}){
    return(
        <div className="container small">
            {rounds.map(round=>(
                <div key={round.number} className="bg-light">
                    <div className="pb-2">
                        <div className="row">
                            <div className="col">Round {round.number}</div>
                            <div className="col">Score: {round.score}</div>
                        </div>

                        <ColorBox color={round.color}/>
                        <ColorBox color={round.guess}/>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}