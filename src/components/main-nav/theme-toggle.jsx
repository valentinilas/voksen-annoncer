
import { useTheme } from '../../lib/theme-context';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Button from '../button/button';
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const iconClasses = 'size-6 text-cherry-700 dark:text-cherry-400'
    return (

        <Button onClick={toggleTheme} variant="tertiary" size="m-icon-only" Icon={theme === 'cupcake' ? MoonIcon : SunIcon}></Button>
        // <Button onClick={toggleTheme} variant="tertiary" size="m-icon-only" Icon={theme === 'cupcake' ? MoonIcon : SunIcon}></Button>

    );
};

export default ThemeToggle;
