import { Country } from "./country";

type CountriesContextType = {
  countries: Country[];
  filteredCountries: Country[];
  searchQuery: string;
  currentRegion: string;
  isLoading: boolean;
  isDropdownVisible: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentRegion: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  getCountryByName: (name: string) => Country | null;
};

export default CountriesContextType;
