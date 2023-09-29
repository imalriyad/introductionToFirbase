import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firbase.config";
import { useState } from "react";
const Home = () => {
  const [logginUser,setLogginUser] = useState(null)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()
  const loginHandlerGoogle = ()=>{
     signInWithPopup(auth,googleProvider)
     .then((result)=>{
        setLogginUser(result.user)
     })
     .catch((error)=>{
         console.log(error);
     })
}
 const loginHandlerGuthub = () =>{
    signInWithPopup(auth,githubProvider)
    .then(result => setLogginUser(result.user))
    .catch(error => console.log(error))
 }


const logOutHandler = ()=>{
    signOut(auth)
    .then(()=> setLogginUser(null))
    .catch((error) => console.log(error))
}
  return <div className="text-center my-[10%]">
    
    {
        logginUser &&  <div> <h1 className="text-4xl mb-4">Name : {logginUser.displayName}</h1>
        <h1 className="text-4xl mb-4">Email: {logginUser.email} </h1>
        <img src={logginUser.photoURL} alt="" className="mx-auto rounded-full mb-5" /></div>
    }
   {
    logginUser ?  <button onClick={logOutHandler} className="btn btn-info">Logout</button>: <div>
        <button onClick={loginHandlerGoogle} className="btn btn-info">Login with google</button> <button onClick={loginHandlerGuthub} className="btn btn-info">Login with Github</button>
    </div>
   }
  </div>;
};

export default Home;
