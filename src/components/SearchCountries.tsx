import { FormEvent, useEffect, useRef, useState, useCallback } from "react";

// Lucide Library
import { Search, TriangleAlert } from "lucide-react";

import { Link } from "react-router-dom";

// Custom Components
import ThreeDotSpinner from "./LoadingSpinner";

// Types
import { MotionType } from "../App";
import { Country } from "./hooks/useCountries";

// Types
type SearchCountriesProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isDropdownVisible: boolean;
  filteredCountries: Country[];
  motion: MotionType;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const dropdownVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

const SearchCountries = ({
  searchQuery,
  setSearchQuery,
  isDropdownVisible,
  setDropdownVisible,
  filteredCountries,
  motion,
}: SearchCountriesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const menuRef = useRef<HTMLMenuElement>(null); // Ref for the menu element
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  // Close the dropdown when clicking outside of it
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isDropdownVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    },
    [isDropdownVisible, setDropdownVisible],
  );

  // Close the dropdown and remove focus from the input when pressing the Escape key.
  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (isDropdownVisible && event.key === "Escape") {
        setDropdownVisible(false);
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    },
    [isDropdownVisible, setDropdownVisible],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [handleClickOutside, handleEscapePress]);

  useEffect(() => {
    if (searchQuery.length >= 1) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filteredCountries.length, searchQuery.length]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  const dropdownMenu = (
    <motion.menu
      className="dropdown-menu-w absolute left-0 top-12 z-[1] mx-6 max-h-60 space-y-2 overflow-auto rounded-md border border-gray-300 bg-white/50 py-2 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out *:p-2 dark:border-gray-600 dark:bg-dark-blue-500/50 md:w-60"
      ref={menuRef}
      initial="hidden"
      animate={searchQuery ? "visible" : "hidden"}
      variants={dropdownVariants}
    >
      {isLoading ? (
        <li>
          <ThreeDotSpinner />
        </li>
      ) : (
        <>
          {filteredCountries.length > 0
            ? filteredCountries.map((country) => (
                <motion.li
                  key={country.name.common}
                  className="mx-1 cursor-pointer rounded-md font-bold hover:bg-gray-200/60 dark:hover:bg-dark-blue-600/60"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <Link
                    to={`/country/${country.name.common.replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2"
                    title={`View details about ${country.name.common}`}
                    aria-label={`View details about ${country.name.common}`}
                    onClick={() => setSearchQuery("")}
                  >
                    <img
                      className="h-[25px] rounded-md"
                      src={country.flags.png}
                      alt={country.name.common}
                      loading="lazy"
                      width={30}
                      height={25}
                    />
                    {country.name.common}
                  </Link>
                </motion.li>
              ))
            : searchQuery.length >= 1 && (
                <motion.li
                  className="flex flex-col items-center gap-1 p-1 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TriangleAlert size={20} className="text-red-500" />
                  No country matches your search in this region.
                </motion.li>
              )}
        </>
      )}
    </motion.menu>
  );

  return (
    <>
      <form
        className="mb-6 flex w-full flex-row-reverse items-center gap-3 rounded-md bg-white px-3 py-2 shadow-sm duration-300 ease-in-out focus-within:ring-1 hover:ring-1 dark:bg-dark-blue-500 md:mb-0 md:w-fit"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="search-country">
          Search for a country
        </label>
        <input
          id="search-country"
          ref={inputRef}
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search for a country..."
          title="Search for a country"
          autoComplete="off"
          maxLength={18}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery) setDropdownVisible(true); // Show dropdown when input is focused and there is a search query
          }}
        />
        <button type="submit" title="submit" disabled>
          <Search size={18} color="hsl(0, 0%, 52%)" />
        </button>
      </form>
      {isDropdownVisible && dropdownMenu}
    </>
  );
};
export default SearchCountries;
