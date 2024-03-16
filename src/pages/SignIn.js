import React, { useState } from 'react'
import { LuEyeOff, LuEye } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };
    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>sign in</h1>
            <div className='flex justify-center flex-wrap items-center px-6 py-12 mx-w-6xl mx-auto'>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'><img className='w-full rounded-2xl' src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="sign in" /></div>
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                    <form>
                        <input onChange={onChange} placeholder='email address' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition-ease-in-out' type="email" id='email' value={email} />
                        <div className='relative mb-6'>
                            <input onChange={onChange} placeholder='password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition-ease-in-out' type={showPassword ? 'text' : 'password'} id='password' value={password} />
                            {showPassword ? <LuEyeOff onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer' /> : <LuEye onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer' />}
                        </div>

                        <div className='flex justify-between whitesapce-nowrap text-sm sm:text-lg'>
                            <p className='mb-6'>Don't have an account yet?
                                <Link className='text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1' to='/sign-up'>Register</Link>
                            </p>
                            <p>
                                <Link className='text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out' to='/forget-password'>Forget Password?</Link>
                            </p>
                        </div>
                        <button className=' w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type='submit'>Sign In</button>
                        <div className=' flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300
                    
                    after:border-t  after:flex-1  after:border-gray-300
                    
                    '>
                            <p className='text-center font-semibold mx-4'>OR</p>
                        </div>
                    </form>
                    <Auth/>
                </div>
            </div>
        </section>
    )
}

export default SignIn