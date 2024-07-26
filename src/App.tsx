import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect, useEffect, useMemo } from "react";

// Custom Components
import Header from "./components/Header";
import SearchCountries from "./components/SearchCountries";
import FilterCountries from "./components/FilterCountries";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import ErrorPage from "./components/ErrorPage";

import { motion } from "framer-motion";

// Utils
import applyTheme from "./utils/applyTheme";
import debounce from "./utils/debounce";

// Types
export type Country = {
  name: {
    common: string;
    official?: string;
  };

  flags: {
    png: string;
  };

  population: number;
  region: string;
  capital?: string;
  subregion?: string;

  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };

  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  languages?: {
    [key: string]: string;
  };

  borders?: [];
  cca3?: string;
};

export type MotionType = typeof motion;

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
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
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
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
      );

      const data = await response.json();

      const theWantedCountries = data.filter(
        (country: Country) => country.name.common !== "Israel",
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
    <div className="app min-h-screen bg-dark-gray-600 text-dark-blue-700 transition-[background-color] duration-300 ease-in-out dark:bg-dark-blue-600 dark:text-white">
      <Router>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex-center-between container mb-10">
                  <SearchCountries
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                  />
                  <FilterCountries
                    currentRegion={currentRegion}
                    setCurrentRegion={setCurrentRegion}
                    handleFilterChange={handleFilterChange}
                  />
                </div>

                <CountriesList
                  isDarkMode={isDarkMode}
                  filteredCountries={filteredCountries}
                  currentRegion={currentRegion}
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  motion={motion}
                />
              </>
            }
          ></Route>
          <Route
            path="/country/:countryName"
            element={
              <CountryDetails
                isLoading={isLoading}
                isDarkMode={isDarkMode}
                motion={motion}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
