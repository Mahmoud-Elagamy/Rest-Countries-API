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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
        className="flex items-center gap-1 rounded-md bg-white px-3 py-2 font-semibold shadow-sm transition-[background-color,transform] duration-300 ease-in-out active:scale-95 dark:bg-dark-blue-500 md:active:scale-50"
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
        className={`absolute z-[1] mt-1 w-full origin-top scale-0 cursor-pointer space-y-1 rounded-md bg-white py-1 shadow-md transition-[background-color,transform] duration-300 ease-in-out *:px-3 dark:bg-dark-blue-500 ${
          isMenuOpen && "scale-100"
        }`}
        ref={menuRef}
      >
        {regions.map((region) => (
          <li
            key={region}
            className={`mx-1 rounded-md ${
              currentRegion === region && "bg-slate-200 dark:bg-dark-blue-600"
            } hover:bg-slate-200 dark:hover:bg-dark-blue-600`}
          >
            <button
              className="w-full py-1 text-left"
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
