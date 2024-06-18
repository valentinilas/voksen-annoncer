import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../lib/auth-context';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const [t] = useTranslation();
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


        <div className="mx-auto bg-base-200  p-5 rounded-box  sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 className="text-2xl font-bold mb-10 text-center dark:text-zinc-400">{t("auth.sign-up")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                        <label htmlFor="username" className="block  text-sm font-bold mb-2">{t("auth.username")}</label>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            id="username"
                            {...register("username", {
                                required: `${t("validation.username-required")}`,
                                maxLength: {
                                    value: 12,
                                    message: `${t("validation.username-length")}`
                                },
                                pattern: {
                                    value:/^[a-zA-Z0-9]+$/,
                                    message: `${t("validation.username-symbols")}`
                                } 
                            })}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block  text-sm font-bold mb-2">{t("auth.email")}</label>
                        <input
                            className="input input-bordered w-full"
                            type="email"
                            id="email"
                            {...register("email", {
                                required: `${t("validation.required")}`,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: `${t("validation.email-invalid")}`
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block  text-sm font-bold mb-2">{t("auth.password")}</label>

                        <input
                            className="input input-bordered w-full"
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    {signUpError && <div className="text-red-500 text-sm mt-4">{signUpError}</div>}
                    <button type="submit" className="cursor-pointer rounded-full font-medium	 flex gap-2 justify-items-center items-center transition-colors border-2 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 text-base bg-cherry-600 border-transparent  text-white hover:bg-cherry-500 w-full text-center justify-center mt-6">{t("auth.sign-up")}</button>
                </form>
                <p className="mt-10 text-center text-sm ">
                    <span className="mr-1">{t("auth.yes-account")}</span>
                    <NavLink to="/sign-in" className="font-semibold leading-6 text-cherry-600 hover:text-cherry-700">{t("auth.login")}</NavLink>
                </p>
            </div>
        </div>
    );
};


