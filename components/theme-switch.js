import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme();

  // When mounted on client, we can show the UI
  useEffect(() => {
      setMounted(true)
    }, []
  );

  // In case not mounted.
  if (!mounted) return null;

  // Render switch buttons
  return (
    <div className="flex flex-row font-bold">
      {((theme === "system" && resolvedTheme === "dark") || theme ==='dark') ? (
      
      <button 
        id="sun" 
        aria-label="activare tema luminoasa"
        className="rounded-full focus:outline-none dark:text-gray-200 dark:hover:text-gray-900 dark:hover:bg-gray-200"
        onClick={() => setTheme('light')}
      >
        <svg
          className="w-6 h-6" 
          fill="white"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      ) : (

      <button
        id="moon" 
        aria-label="activare tema intunecata"
        className="rounded-full focus:outline-none text-gray-900 hover:bg-gray-900 hover:text-gray-100"
        onClick={() => setTheme('dark')}
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      </button>
      )}
    </div>
  );

}

export default ThemeSwitch;
