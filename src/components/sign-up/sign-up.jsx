import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../lib/auth-context';

import { useForm } from 'react-hook-form';


export default function SignUp() {
    const { auth_user_register } = useAuth();

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [signUpError, setSignupError] = useState('');


    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password, username } = data;

        try {
            await auth_user_register(email, password, username);
            navigate('/welcome');
        } catch (error) {
            setSignupError(error.message);  // Set the login error message

        }
    };







    return (


        <div className="container mx-auto bg-white mt-10 p-5 rounded-lg shadow-sm sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="username"
                            {...register("username", {
                                required: "Username is required",
                                maxLength: {
                                    value: 12,
                                    message: "Username must be 12 characters or less"
                                },
                                pattern: {
                                    value:/^[a-zA-Z0-9]+$/,
                                    message: "Username must contain only letters and numbers"
                                } 
                            })}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>

                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    {signUpError && <div className="text-red-500 text-sm mt-4">{signUpError}</div>}
                    <button type="submit" className="cursor-pointer rounded-full font-medium	 flex gap-2 justify-items-center items-center transition-colors border-2 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 text-base bg-cherry-600 border-transparent  text-white hover:bg-cherry-500 w-full text-center justify-center mt-6">Register</button>
                </form>
            </div>
        </div>
    );
};


