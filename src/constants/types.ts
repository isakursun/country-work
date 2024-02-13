
//! tipleri tanımlama
export interface Language {
  name: string;
}

export interface Country {
  code: string;
  currency: string;
  name: string;
  capital: string;
  phone: string;
  languages: Language[];
}

export interface CountryListQuery {
  countries: Country[];
}

//! inputtaki değerin tipini burada belirttim
export type Props = {
  search: string;
};
