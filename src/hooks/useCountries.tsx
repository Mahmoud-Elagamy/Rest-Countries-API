import { useContext } from "react";
import CountriesContext from "../providers/CountriesProvider";

const useCountriesContext = () => {
  const context = useContext(CountriesContext);

  if (!context) {
    throw new Error(
      "useCountriesContext must be used within the CountriesProvider",
    );
  }

  return context;
};
export default useCountriesContext;
