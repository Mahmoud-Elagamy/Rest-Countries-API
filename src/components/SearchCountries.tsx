// Lucide Library
import { Search } from "lucide-react";

import { FormEvent } from "react";

// Types
type SearchCountriesProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchCountries = ({
  searchQuery,
  setSearchQuery,
}: SearchCountriesProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="mb-6 flex w-full flex-row-reverse items-center gap-3 rounded-md bg-white p-3 shadow-sm duration-300 ease-in-out focus-within:ring-1 hover:ring-1 dark:bg-dark-blue-500 md:mb-0 md:w-fit"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="search-country">
        Search for a country
      </label>
      <input
        id="search-country"
        className="w-full bg-transparent outline-none"
        type="text"
        placeholder="Search for a country..."
        autoComplete="off"
        autoCorrect="on"
        autoFocus
        required
        maxLength={18}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" title="Submit">
        <Search size={18} color="hsl(0, 0%, 52%)" />
      </button>
    </form>
  );
};
export default SearchCountries;
