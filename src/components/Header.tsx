// Lucide Library
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

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
    <header className="py-4 mb-6 transition-[background-color] duration-300 ease-in-out bg-white dark:bg-dark-blue-500  shadow-sm">
      <div className="container flex-center-between">
        <h1 className="md:text-2xl font-extrabold">Where in the world?</h1>
        <button
          className="flex items-center gap-1 font-semibold group/item p-2 rounded-md shadow-sm transition-[background-color] duration-300 ease-in-out bg-slate-200 dark:bg-dark-blue-600"
          type="button"
          title="Toggle Theme"
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun
              size={20}
              className=" duration-300 ease-in-out group-hover/item:rotate-[360deg] "
            />
          ) : (
            <Moon
              size={20}
              className=" duration-300 ease-in-out group-hover/item:rotate-[360deg]"
            />
          )}
        </button>
      </div>
    </header>
  );
};
export default Header;
