import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('cupcake');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'cupcake';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.dataset.theme = 'dark';
        } else {
            document.documentElement.dataset.theme = 'cupcake';
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'cupcake' ? 'dark' : 'cupcake';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.dataset.theme = 'dark';
        } else {
            document.documentElement.dataset.theme = 'cupcake';
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
