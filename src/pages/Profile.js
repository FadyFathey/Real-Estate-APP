import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const { name, email } = formData

    const onLogOut = ()=>
    {
        auth.signOut()
        navigate('/')
    }
    return (
        <>
            <section className='max-w-6xl m-auto flex justify-center items-center flex-col '>
                <h1 className='text-3xl text-center mt-6 font-bold '>my profile</h1>
                <div className='w-full md:w-[50%] mt-6 mx-3 '>
                    <form>
                        <input disabled type=' text' id='name' value={name} className=' w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition-ease-in-out  ' />

                        <input disabled type='text' id='email' value={email} className='mb-6 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition-ease-in-out  ' />

                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 '>
                            <p className='flex items-center '>Do you want to change your name?
                                <span className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1 cursor-pointer'>Edit</span>
                            </p>
                            <p onClick={onLogOut} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign Out</p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Profile