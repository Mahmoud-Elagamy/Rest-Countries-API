//Todo: Multiple select.
//! Don't forget to fix the pagination problem.

import { useState, useLayoutEffect, useEffect, useMemo } from "react";

// Custom Components
import Header from "./components/Header";
import SearchCountries from "./components/SearchCountries";
import FilterCountries from "./components/FilterCountries";
import CountriesList from "./components/CountriesList";

// Utils
import applyTheme from "./utils/applyTheme";
import debounce from "./utils/debounce";

// Types
export type Country = {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital?: string;
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRegion, setCurrentRegion] = useState("All Regions");
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filterCountries = () => {
    let filtered = countries;

    if (currentRegion !== "All Regions") {
      filtered = filtered.filter((country) => country.region === currentRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentRegion(filter);
  };

  const debouncedFilter = useMemo(() => {
    return debounce(() => {
      filterCountries();
    }, 300);
  }, [countries, currentRegion, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
      );

      const data = await response.json();

      const theWantedCountries = data.filter(
        (country: Country) => country.name.common !== "Israel"
      );

      setCountries(theWantedCountries);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useLayoutEffect(() => {
    applyTheme(setIsDarkMode);
  }, []);

  useEffect(() => {
    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [currentRegion, searchQuery, debouncedFilter]);

  return (
    <div className="app min-h-screen transition-[background-color] duration-300 ease-in-out text-dark-blue-700  dark:text-white bg-dark-gray-600 dark:bg-dark-blue-600">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="container flex-center-between mb-6">
        <SearchCountries setSearchQuery={setSearchQuery} />
        <FilterCountries
          currentRegion={currentRegion}
          handleFilterChange={handleFilterChange}
          setCurrentRegion={setCurrentRegion}
        />
      </div>
      <CountriesList
        isDarkMode={isDarkMode}
        filteredCountries={filteredCountries}
        currentRegion={currentRegion}
        isLoading={isLoading}
        searchQuery={searchQuery}
      />
    </div>
  );
};
export default App;
