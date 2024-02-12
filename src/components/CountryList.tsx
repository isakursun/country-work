import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../constants/constants";
import { Country, CountryListQuery } from "../constants/types";
import { useEffect, useState } from "react";
import { colorOptions } from "../constants/constants";

type Props = {
  search: string;
};

const CountryList: React.FC<Props> = ({ search }) => {
  const [selectedItem, setSelectedItem] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [clickedCard, setClickedCard] = useState<boolean>(true);
  const [copyCountries, setCopyCountries] = useState<Country[]>([]);

  const { loading, data } = useQuery<CountryListQuery>(GET_COUNTRY);

  useEffect(() => {
    if (data && data.countries) {
      setCountries(data.countries);
      setCopyCountries(data.countries);
      setSelectedItem(
        data.countries.length >= 10
          ? data.countries[9]
          : data.countries[data.countries.length - 1]
      );
    }
  }, [data]);

  useEffect(() => {
    const newArray = copyCountries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(newArray);
  }, [search]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  };

  const handleItemClick = (country: Country) => {
    if (selectedItem?.code.toLowerCase() !== country.code.toLowerCase()) {
      setClickedCard(true);
      setSelectedItem(country);
    } else {
      setClickedCard(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-4/5 mx-auto text-center flex flex-col gap-8 my-5">
      <h1 className="font-bold text-2xl">Country List</h1>
      <div className="w-full flex flex-wrap gap-5 justify-center">
        {countries?.map((country) => (
          <div
            onClick={() => {
              setClickedCard(!clickedCard), handleItemClick(country);
            }}
            className="flex flex-col gap-2 border rounded shadow-lg p-5 w-52 text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor:
                selectedItem === country && clickedCard
                  ? getRandomColor()
                  : "transparent",
            }}
          >
            <div>
              <span className="font-bold text-xl">{country.name}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Code: {country.code}</p>
              <p>Capital: {country.capital}</p>
              <p>Currency: {country.currency}</p>
              <p>Phone: {country.phone}</p>
              <p>Language: {country.languages[0]?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
