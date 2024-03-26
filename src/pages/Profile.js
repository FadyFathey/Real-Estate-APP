import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
const Profile = () => {
const auth = getAuth();
const [changeDetails, setChangeDetails] = useState(false);
const navigate = useNavigate();
const [formData, setFormData] = useState({
name: auth.currentUser.displayName,
email: auth.currentUser.email,
});
const { name, email } = formData;

const onLogOut = () => {
auth.signOut();
navigate("/");
};

const onChange = (e) => {
setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
}));
};

const onSubmit = async () => {
try {
    // update name in firebase auth
    if (auth.currentUser.displayName !== name) {
    await updateProfile(auth.currentUser, {
        displayName: name,
    });
    }
    // update name in fireStore
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
    name: name,
    });
    toast.success("Profile updated");
    // refresh page after 2 seconds
    setTimeout(() => {
    window.location.reload();
    }, 2000);
} catch (error) {
    toast.error("Could not update profile");
}
};
return (
<>
    <section className="max-w-6xl m-auto flex justify-center items-center flex-col ">
    <h1 className="text-3xl text-center mt-6 font-bold ">my profile</h1>
    <div className="w-full md:w-[50%] mt-6 mx-3 ">
        <form>
        <input
            disabled={!changeDetails}
            onChange={onChange}
            type=" text"
            id="name"
            value={name}
            className={` w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition-ease-in-out  ${
            changeDetails && "bg-red-200 focus:bg-red-200"
            }`}
        />

        <input
            disabled
            type="text"
            id="email"
            value={email}
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition-ease-in-out `}
        />

        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 ">
            <p className="flex items-center ">
            Do you want to change your name?
            <span
                onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1 cursor-pointer"
            >
                {changeDetails ? "Apply change" : "Edit"}
            </span>
            </p>
            <p
            onClick={onLogOut}
            className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
            Sign Out
            </p>
        </div>
        </form>{" "}
        <button
        type="submit"
        className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
        <Link
            to="/create-listing"
            className="flex justify-center items-center"
        >
            <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
            Sell or Rent Property
        </Link>
        </button>
    </div>
    </section>
</>
);
};

export default Profile;
