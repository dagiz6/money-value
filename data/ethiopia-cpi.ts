import { CountryCPIDataset } from '../types/inflation';

/**
 * Historical Consumer Price Index (CPI) dataset for Ethiopia (ETB).
 *
 * Source: World Bank Development Indicators (Indicator FP.CPI.TOTL).
 * Primary National Sources: Ethiopian Statistical Service (ESS) & IMF International Financial Statistics.
 * Base Year: 2010 = 100
 * Frequency: Annual
 * Last Sourced / Updated: World Bank Data Release July 2026
 *
 * Notes on methodology:
 * - Data points reflect the annual Consumer Price Index (all items) compiled by ESS and reported via the IMF/World Bank.
 * - Missing years before 1965 are not included; calculations gracefully restrict selections to verified years (1965–2025).
 */
export const ethiopiaCPIDataset: CountryCPIDataset = {
  currency: 'ETB',
  countryName: 'Ethiopia',
  currencyName: 'Ethiopian Birr',
  symbol: 'ETB',
  source: 'World Bank Open Data / Ethiopian Statistical Service (ESS) & IMF International Financial Statistics',
  sourceUrl: 'https://data.worldbank.org/indicator/FP.CPI.TOTL?locations=ET',
  baseYear: '2010 = 100',
  frequency: 'Annual',
  lastUpdated: 'July 2026',
  minYear: 1965,
  maxYear: 2025,
  data: [
    { year: 1965, cpi: 4.6979 },
    { year: 1966, cpi: 4.6339 },
    { year: 1967, cpi: 4.6714 },
    { year: 1968, cpi: 4.6799 },
    { year: 1969, cpi: 4.7466 },
    { year: 1970, cpi: 5.2271 },
    { year: 1971, cpi: 5.2551 },
    { year: 1972, cpi: 4.9355 },
    { year: 1973, cpi: 5.3755 },
    { year: 1974, cpi: 5.8373 },
    { year: 1975, cpi: 6.2197 },
    { year: 1976, cpi: 7.9947 },
    { year: 1977, cpi: 9.3263 },
    { year: 1978, cpi: 10.6608 },
    { year: 1979, cpi: 12.3699 },
    { year: 1980, cpi: 12.9244 },
    { year: 1981, cpi: 13.7174 },
    { year: 1982, cpi: 14.5254 },
    { year: 1983, cpi: 14.4273 },
    { year: 1984, cpi: 15.6417 },
    { year: 1985, cpi: 18.6237 },
    { year: 1986, cpi: 16.797 },
    { year: 1987, cpi: 16.389 },
    { year: 1988, cpi: 17.5495 },
    { year: 1989, cpi: 18.9214 },
    { year: 1990, cpi: 19.8963 },
    { year: 1991, cpi: 27.0038 },
    { year: 1992, cpi: 29.8466 },
    { year: 1993, cpi: 30.9041 },
    { year: 1994, cpi: 33.2509 },
    { year: 1995, cpi: 36.5834 },
    { year: 1996, cpi: 33.4795 },
    { year: 1997, cpi: 34.2815 },
    { year: 1998, cpi: 34.5882 },
    { year: 1999, cpi: 37.335 },
    { year: 2000, cpi: 37.5823 },
    { year: 2001, cpi: 34.4864 },
    { year: 2002, cpi: 34.7192 },
    { year: 2003, cpi: 39.4667 },
    { year: 2004, cpi: 40.7799 },
    { year: 2005, cpi: 44.8456 },
    { year: 2006, cpi: 50.3614 },
    { year: 2007, cpi: 59.0439 },
    { year: 2008, cpi: 85.2339 },
    { year: 2009, cpi: 92.4648 },
    { year: 2010, cpi: 100.0 },
    { year: 2011, cpi: 133.25 },
    { year: 2012, cpi: 164.6975 },
    { year: 2013, cpi: 176.9906 },
    { year: 2014, cpi: 189.1852 },
    { year: 2015, cpi: 207.2882 },
    { year: 2016, cpi: 221.0275 },
    { year: 2017, cpi: 244.649 },
    { year: 2018, cpi: 278.4914 },
    { year: 2019, cpi: 322.5198 },
    { year: 2020, cpi: 388.1731 },
    { year: 2021, cpi: 492.3569 },
    { year: 2022, cpi: 659.2161 },
    { year: 2023, cpi: 858.4235 },
    { year: 2024, cpi: 1039.0164 },
    { year: 2025, cpi: 1176.4746 },
  ],
};
