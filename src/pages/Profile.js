import { getDoc, doc} from "firebase/firestore"
import { useEffect, useState } from "react"
import ProfileCard from "../components/ProfileCard"

export default function Profile({db, auth}){
    const [user, setUser] = useState()

    useEffect(()=>{
        loadInfo()
        
    },[])

    // Load user information
    async function loadInfo(){
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
        
        if(userDoc.exists()){
            setUser(userDoc.data())
        }
        else{
            console.log("Couldn't get user data!")
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg">
                    <ProfileCard user={user}/>
                </div>
                <div className="col">
                    
                </div>
            </div>
        </div>
    )
}