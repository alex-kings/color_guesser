import { initializeApp } from "firebase/app";
import Signup from './pages/Signup';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSm0FDzR54Vf9zGxRBvTb9Qq9evIj7kOw",
  authDomain: "color-guesser-63bdd.firebaseapp.com",
  projectId: "color-guesser-63bdd",
  storageBucket: "color-guesser-63bdd.appspot.com",
  messagingSenderId: "953640217525",
  appId: "1:953640217525:web:da8faf362760f3bde147fc",
  measurementId: "G-MDCWMM9V3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if(app != null){
  console.log('app created')
}


function App() {
  return (
    <div className="App">
      <Signup/>
    </div>
  );
}

export default App;
