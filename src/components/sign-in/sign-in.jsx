import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/auth-context';
import Button from '../button/button';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function SignIn() {
    const [t] = useTranslation();
    const { auth_user_log_in } = useAuth();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            await auth_user_log_in(email, password);
            navigate('/dashboard');
        } catch (error) {
            // setError('email', { type: 'manual', message: error.message });
            setLoginError(error.message);  // Set the login error message

        }
    };

    return (
        <div className="mx-auto bg-base-200  p-5 rounded-box  sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-2xl font-bold mb-10 text-center dark:text-zinc-400">{t("auth.login")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block  text-sm font-bold mb-2">Email:</label>
                        <input
                            className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
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
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block  text-sm font-bold mb-2">{t("auth.password")}</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-cherry-600 hover:text-cherry-700">{t("auth.forgot-password")}</a>
                            </div>
                        </div>
                        <input
                            className={`input input-bordered w-full ${errors.password ? 'border-red-500' : ''}`}
                            type="password"
                            id="password"
                            {...register("password", { required: `${t("validation.password-required")}` })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    {loginError && <div className="text-red-500 text-sm mt-4">{loginError}</div>}

                    <Button type="submit" className="mt-6 w-full justify-center">{t("auth.login")}</Button>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    <span className="mr-1 ">{t("auth.no-account")}</span>
                    <NavLink to="/sign-up" className="font-semibold leading-6 text-cherry-600 hover:text-cherry-700">{t("auth.sign-up")}</NavLink>
                </p>
            </div>
        </div>
    );
};
