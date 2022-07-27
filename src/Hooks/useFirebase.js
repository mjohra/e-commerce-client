import { getAuth,
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signOut, } from "firebase/auth";

import { useState,useEffect } from "react";
import initializeAuthentication from "../Pages/Firebase/firebase.init";

    initializeAuthentication();

    const useFirebase=()=>{

        const [user,setUser]=useState({});
        const [isLoading,setIsLoading]=useState(true);
        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const [error,setError]=useState("");
        const [name,setName]=useState("");
        const [admin,setAdmin]=useState(false);

        const auth=getAuth();
        const googleProvider=new GoogleAuthProvider();

        // google sign in
        const signInUsingGoogle=()=>{
            setIsLoading(true);
            return signInWithPopup(auth,googleProvider);
        };

        // Name function
        const handleNameChange=(e)=>{
            setName(e.target.value);
        };

        // email function
        const handleEmailChange=(e)=>{
            setEmail(e.target.value);
        };

        // password function
        const handlePasswordChange=(e)=>{
            setPassword(e.target.value);
        };

        //registration function
        const handleRegistration=(e)=>{
            e.preventDefault();
            if(password.length < 6){
                setError("Password must be at least 6 charecter long");
                return;
            }
        };

        //login function
        const processLogin=(e)=>{
            return signInWithEmailAndPassword(auth,email,password);
        };

        //new user registration
        const registerNewUser=(email,password,name)=>{
            createUserWithEmailAndPassword(auth,email,password)
            .then((result)=>{
                const user=result.user;
                console.log(user);
                setError("");
                verifyEmail();
                setUserName();
                const newUser={email,displayName:name};
                setUser(newUser);
            })
            .catch((error)=>{
                setError(error.message);
            });
        };

        const setUserName=()=>{
            updateProfile(auth.currentUser,{displayName:name})
            .then((result)=>{});
        }

        const verifyEmail=()=>{
            sendEmailVerification(auth.currentUser)
            .then((result)=>{});
        }
        const handleResetPassword = () => {
            sendPasswordResetEmail(auth, email).then((result) => {});
          };

          const logOut = () => {
            setIsLoading(true);
            signOut(auth)
              .then(() => {})
              .finally(() => setIsLoading(false));
          };


          return {
            user,
            admin,
            isLoading,
            handleResetPassword,
            signInUsingGoogle,
            handleRegistration,
            handlePasswordChange,
            handleEmailChange,
            handleNameChange,
            error,
            processLogin,
            logOut,
            setUser,
            setIsLoading,
            setError,
          };
        };
        
        export default useFirebase;


    
    