import { createContext, useEffect, useState } from "react";
import app from "../../Firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn =(email , password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : photo,
        })
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email : currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false)
            }
            console.log('c user', currentUser)
        })
        
        return () =>{
            unSubscribe()
        }
    },[axiosPublic])

    const authInfo ={
        createUser,
        loading,
        user,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;