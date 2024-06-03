import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [userMetaData, setUserMetaData] = useState('');
    const [loading, setLoading] = useState(true);




    // Listen for auth changes on:
    // SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, USER_DELETED, PASSWORD_RECOVERY

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false);
            console.log(_event);
            console.log(session);
        })

        return () => subscription.unsubscribe()
    }, [])

    const auth_user_register = async (email, password, username) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        ...(username ? { username: username } : {})
                    }
                },
            });

            if (error) {
                console.error('Error signing up:', error.message);
                return;
            }

        } catch (error) {
            console.error('Signing up:', error);
        }

    }

    const auth_user_log_in = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error logging in:', error.message);
                return;
            }

        } catch (error) {
            console.error('Unexpected error logging in:', error);
        }

    }
    const auth_user_log_out = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }


        } catch (error) {
            console.error('Unexpected error logging out:', error);
        }
    }

    const value = {
        session,
        loading,
        auth_user_register,
        auth_user_log_in,
        auth_user_log_out
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}





