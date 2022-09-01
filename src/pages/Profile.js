import { getDoc, doc} from "firebase/firestore"
import { useEffect } from "react"

export default function Profile({db, auth}){

    useEffect(async ()=>{
        // Load user information
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
        
        if(userDoc.exists()){
            console.log(userDoc.data())
        }
        else{
            console.log("Couldn't get user data!")
        }
        
    })

    return(
        <div className="container-fluid p-3">
            <div>

            </div>
        </div>
    )
}