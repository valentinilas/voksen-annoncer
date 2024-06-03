import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../lib/auth-context';

import Button from '../button/button';


export default function SignIn() {
    const { auth_user_log_in } = useAuth();

    const navigate = useNavigate();
    const handleLogin = async (event)=>{
        event.preventDefault();

        try {
            await auth_user_log_in(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    return (


        <div className="container mx-auto bg-white mt-10 p-5 rounded-lg shadow-sm sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign in to your account</h2>
                <form onSubmit={handleLogin}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>

                        <input
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" value="Submit" className="mt-6 w-full justify-center">Login</Button>
                </form>
            </div>
        </div>
    );
};


