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
  area?: number;
};
