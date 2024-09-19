import { Link } from "react-router-dom";

// Lucide Library
import { Moon, Sun } from "lucide-react";

// Types
type HeaderProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isDarkMode, setIsDarkMode }: HeaderProps) => {
  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  return (
    <header className="mb-10 bg-white py-4 shadow-sm transition-[background-color] duration-300 ease-in-out dark:bg-dark-blue-500">
      <div className="flex-center-between container">
        <Link to="/">
          <h1 className="font-extrabold md:text-2xl">Where in the world?</h1>
        </Link>
        <button
          className="group/item rounded-md bg-slate-200 p-2 shadow transition-[background-color] duration-300 ease-in-out dark:bg-dark-blue-600"
          type="button"
          title="Toggle Theme"
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun
              size={18}
              className="duration-300 ease-in-out group-hover/item:rotate-[360deg]"
            />
          ) : (
            <Moon
              size={18}
              className="duration-300 ease-in-out group-hover/item:rotate-[360deg]"
            />
          )}
        </button>
      </div>
    </header>
  );
};
export default Header;
