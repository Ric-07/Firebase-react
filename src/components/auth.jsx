import { useState } from "react";
import { auth, googleProvider } from "../config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const Auth = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try{

       
          await signInWithEmailAndPassword(auth, email, password);
        } catch(err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }catch(err) {
            console.error(err);
        }
    };

    const signOut = async () => {
        try {
            await signInWithPopup(auth);
        } catch (err) {
            console.error(err);
        }
    };



    return(
        <div>
        <input placeholder="email..." onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password..." type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>sign-in</button>

        <button onClick={signInWithGoogle}> sign in with google</button>

        <button onClick={signOut}>sign-out</button>
        </div>
    );
};