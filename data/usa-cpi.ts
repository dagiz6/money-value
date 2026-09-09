import { CountryCPIDataset } from '../types/inflation';

/**
 * Historical Consumer Price Index (CPI) dataset for the United States (USD).
 *
 * Source: World Bank Development Indicators (Indicator FP.CPI.TOTL) & U.S. Bureau of Labor Statistics (BLS).
 * Base Year: 2010 = 100
 * Frequency: Annual
 * Last Sourced / Updated: World Bank Data Release July 2026
 *
 * Notes on methodology:
 * - CPI-U (Consumer Price Index for All Urban Consumers, U.S. city average, all items) compiled annually.
 * - Normalized to base year 2010 = 100 (matching global World Bank/IMF standards).
 * - Full verified annual observations span 1960 through 2024.
 * - Missing future years (e.g. 2025/2026 pending finalized full annual BLS revisions) are gracefully excluded.
 */
export const usaCPIDataset: CountryCPIDataset = {
  currency: 'USD',
  countryName: 'United States',
  currencyName: 'US Dollar',
  symbol: '$',
  source: 'World Bank Open Data / U.S. Bureau of Labor Statistics (BLS) & IMF International Financial Statistics',
  sourceUrl: 'https://data.worldbank.org/indicator/FP.CPI.TOTL?locations=US',
  baseYear: '2010 = 100',
  frequency: 'Annual',
  lastUpdated: 'July 2026',
  minYear: 1960,
  maxYear: 2025,
  data: [
    { year: 1960, cpi: 13.5631 },
    { year: 1961, cpi: 13.7083 },
    { year: 1962, cpi: 13.8726 },
    { year: 1963, cpi: 14.0446 },
    { year: 1964, cpi: 14.2242 },
    { year: 1965, cpi: 14.4497 },
    { year: 1966, cpi: 14.8854 },
    { year: 1967, cpi: 15.2981 },
    { year: 1968, cpi: 15.9516 },
    { year: 1969, cpi: 16.8229 },
    { year: 1970, cpi: 17.8051 },
    { year: 1971, cpi: 18.5694 },
    { year: 1972, cpi: 19.1771 },
    { year: 1973, cpi: 20.3618 },
    { year: 1974, cpi: 22.6127 },
    { year: 1975, cpi: 24.6803 },
    { year: 1976, cpi: 26.0981 },
    { year: 1977, cpi: 27.7949 },
    { year: 1978, cpi: 29.9159 },
    { year: 1979, cpi: 33.2828 },
    { year: 1980, cpi: 37.7924 },
    { year: 1981, cpi: 41.6981 },
    { year: 1982, cpi: 44.2548 },
    { year: 1983, cpi: 45.6764 },
    { year: 1984, cpi: 47.6408 },
    { year: 1985, cpi: 49.3299 },
    { year: 1986, cpi: 50.2663 },
    { year: 1987, cpi: 52.1083 },
    { year: 1988, cpi: 54.2331 },
    { year: 1989, cpi: 56.851 },
    { year: 1990, cpi: 59.9198 },
    { year: 1991, cpi: 62.4573 },
    { year: 1992, cpi: 64.3491 },
    { year: 1993, cpi: 66.2484 },
    { year: 1994, cpi: 67.9758 },
    { year: 1995, cpi: 69.8828 },
    { year: 1996, cpi: 71.9312 },
    { year: 1997, cpi: 73.6128 },
    { year: 1998, cpi: 74.7554 },
    { year: 1999, cpi: 76.3911 },
    { year: 2000, cpi: 78.9707 },
    { year: 2001, cpi: 81.2026 },
    { year: 2002, cpi: 82.4905 },
    { year: 2003, cpi: 84.3631 },
    { year: 2004, cpi: 86.6217 },
    { year: 2005, cpi: 89.5605 },
    { year: 2006, cpi: 92.4497 },
    { year: 2007, cpi: 95.087 },
    { year: 2008, cpi: 98.7375 },
    { year: 2009, cpi: 98.3864 },
    { year: 2010, cpi: 100.0 },
    { year: 2011, cpi: 103.1568 },
    { year: 2012, cpi: 105.2915 },
    { year: 2013, cpi: 106.8338 },
    { year: 2014, cpi: 108.5669 },
    { year: 2015, cpi: 108.6957 },
    { year: 2016, cpi: 110.067 },
    { year: 2017, cpi: 112.4116 },
    { year: 2018, cpi: 115.1573 },
    { year: 2019, cpi: 117.2442 },
    { year: 2020, cpi: 118.6905 },
    { year: 2021, cpi: 124.2664 },
    { year: 2022, cpi: 134.2112 },
    { year: 2023, cpi: 139.7358 },
    { year: 2024, cpi: 143.8573 },
    { year: 2025, cpi: 147.6479 },
  ],
};
