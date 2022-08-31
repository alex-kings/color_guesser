import { useNavigate } from "react-router-dom"

export default function ResultCard({score}) {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="bg-light rounded p-2 text-center">
                <div className="mb-3 h5">Final score: {score}</div>
                <button onClick={() => { navigate('/main') }} className="row btn btn-outline-primary">back to main page</button>
            </div>
        </div>
    )
}