import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
} from "react";
import debounce from "../utils/debounce";
import { Country } from "../types/country";
import CountriesContextType from "../types/countries-context";

const CountriesContext = createContext<CountriesContextType | null>(null);

export const CountriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRegion, setCurrentRegion] = useState("All Regions");
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,maps,currencies,languages,borders,cca3,area",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Country[] = await response.json();

        const wantedCountries = data.filter(
          (country) => country.name.common !== "Israel",
        );

        setCountries(wantedCountries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData();

    return () => debouncedFetchData.cancel();
  }, []);

  const filterCountries = useCallback(() => {
    let filtered = countries;

    if (currentRegion !== "All Regions") {
      filtered = filtered.filter((country) => country.region === currentRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );

      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }

    setFilteredCountries(filtered);
  }, [countries, currentRegion, searchQuery]);

  const debouncedFilter = useMemo(() => {
    return debounce(() => {
      filterCountries();
    }, 700);
  }, [filterCountries]);

  const getCountryByName = useCallback(
    (name: string) => {
      const country = countries.find(
        (country) => country.name.common.toLowerCase() === name.toLowerCase(),
      );
      return country || null;
    },
    [countries],
  );

  useEffect(() => {
    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [currentRegion, searchQuery, debouncedFilter]);

  const contextValues = useMemo(
    () => ({
      countries,
      filteredCountries,
      searchQuery,
      setSearchQuery,
      currentRegion,
      setCurrentRegion,
      isLoading,
      setIsLoading,
      isDropdownVisible,
      setIsDropdownVisible,
      getCountryByName,
    }),
    [
      countries,
      filteredCountries,
      searchQuery,
      currentRegion,
      isLoading,
      setIsLoading,
      isDropdownVisible,
      setIsDropdownVisible,
      getCountryByName,
    ],
  );

  return (
    <CountriesContext.Provider value={contextValues}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContext;
