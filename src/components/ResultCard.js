import { useNavigate } from "react-router-dom"

export default function ResultCard({score}) {
    const navigate = useNavigate()

    return (
        <div className="p-3 bg-light card">
            <div className="text-center">
                <div className="mb-3 h4">Final score: {score}</div>
                <button onClick={() => { navigate('/main') }} className="row btn btn-outline-primary">back to main page</button>
            </div>
        </div>
    )
}