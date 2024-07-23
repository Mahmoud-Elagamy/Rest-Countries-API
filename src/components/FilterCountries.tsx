import { useState, useEffect, useRef } from "react";

// Lucide Library
import { ChevronDown } from "lucide-react";

// Types
type FilterCountriesProps = {
  currentRegion: string;
  setCurrentRegion: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange: (filter: string) => void;
};

const FilterCountries = ({
  currentRegion,
  setCurrentRegion,
  handleFilterChange,
}: FilterCountriesProps) => {
  const regions = [
    "All Regions",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLMenuElement>(null);

  const toggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMenuOpen && event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <button
        className="font-semibold flex items-center gap-1 bg-white dark:bg-dark-blue-500 shadow-sm p-3 rounded-md transition-[background-color,transform] duration-300 ease-in-out active:scale-95 md:active:scale-50"
        onClick={toggleMenu}
      >
        Filter by Region{" "}
        <ChevronDown
          size={16}
          className={`transition-[transform] duration-300 ease-in-out ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <menu
        className={`absolute z-[1] w-full py-1 *:px-3 space-y-1 rounded-md transition-[background-color,transform] duration-300 ease-in-out bg-white dark:bg-dark-blue-500 shadow-md mt-1 cursor-pointer origin-top scale-0 ${
          isMenuOpen && "scale-100"
        }`}
        ref={menuRef}
      >
        {regions.map((region) => (
          <li
            key={region}
            className={`rounded-md mx-1 ${
              currentRegion === region && "bg-slate-200 dark:bg-dark-blue-600"
            } hover:bg-slate-200 dark:hover:bg-dark-blue-600 `}
          >
            <button
              className="w-full text-left py-1"
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => {
                setIsMenuOpen(false);
                handleFilterChange(region);
                setCurrentRegion(region);
              }}
            >
              {region}
            </button>
          </li>
        ))}
      </menu>
    </div>
  );
};
export default FilterCountries;
