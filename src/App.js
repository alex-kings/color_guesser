import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Main from "./pages/Main";
import './App.css';
import Root from "./pages/Root";
import { getAuth } from "firebase/auth";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import { getFirestore } from "firebase/firestore";
import Profile from "./pages/Profile";

function App() {

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
  const db = getFirestore(app)
  // Authentication
  const auth = getAuth()

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Color_Guesser/' element={<Root/>} />
        <Route path='/Color_Guesser/main' element = {<><Navbar/><Main auth={auth}/></>} />
        <Route path='/Color_Guesser/game' element = {<><Navbar/><Game db={db} auth={auth}/></>} />
        <Route path='/Color_Guesser/profile' element = {<><Navbar/><Profile db={db} auth={auth}/></>} />
        <Route path='/Color_Guesser/leaderboard' element = {<><Navbar/><Leaderboard/></>} />
        <Route path='/Color_Guesser/signup' element = {<Signup db={db} auth={auth}/>} />
        <Route path='/Color_Guesser/login' element = {<Login auth={auth}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
