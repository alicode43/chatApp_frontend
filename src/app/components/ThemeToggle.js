import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';


const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      // Default to light theme if no saved theme is found
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 p-2 rounded-full ${
        theme === 'light'
          ? 'bg-white text-black border border-black'
          : 'bg-black text-white border border-white'
      }`}
    >
      {theme === 'light' ? (
        <>
          <FaMoon /> 
        </>
      ) : (
        <>
          <FaSun /> 
        </>
      )}
    </button>
  );
};


export default ThemeToggle;
