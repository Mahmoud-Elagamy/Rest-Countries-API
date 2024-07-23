// Lucide Library
import { Search } from "lucide-react";

import { FormEvent } from "react";

// Types
type SearchCountriesProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchCountries = ({ setSearchQuery }: SearchCountriesProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex items-center flex-row-reverse gap-3 p-3 mb-6 w-full rounded-md  bg-white dark:bg-dark-blue-500 shadow-sm hover:ring-1 focus-within:ring-1 duration-300 ease-in-out md:w-fit md:mb-0"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="search-country">
        Search for a country
      </label>
      <input
        id="search-country"
        className="outline-none bg-transparent w-full"
        type="text"
        placeholder="Search for a country..."
        autoComplete="off"
        autoCorrect="on"
        required
        maxLength={18}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" title="Submit">
        <Search size={18} color="hsl(0, 0%, 52%)" />
      </button>
    </form>
  );
};
export default SearchCountries;
