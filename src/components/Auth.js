import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const navigate = useNavigate();
    const onClickGoogle = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for user is already in database or not

            //doc => for 'db' for your database and 'users' for your collection and 'user.uid' for your current user 
            const docRef = doc(db, 'users', user.uid)
            // getDoc => take the docRef and get the data
            const docSnap = await getDoc(docRef);

            // if not exist then add user to database
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }
            toast.success('Sign in successful')
            navigate('/');
        } catch (error) {
            toast.error('Could not authorize with google')
        }
    }
    return (
        <button type='button' onClick={onClickGoogle} className='w-full flex gap-2 items-center justify-center bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800'>
            <FcGoogle className='text-2xl bg-white rounded-full ' />
            continue with google</button>
    )
}

export default Auth