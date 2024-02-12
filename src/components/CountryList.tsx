import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../constants/constants";
import { Country, CountryListQuery } from "../constants/types";
import { useEffect, useState } from "react";
import { colorOptions } from "../constants/constants";
import Loader from "./Loader";

//! inputtaki değerin tipini burada belirttim
type Props = {
  search: string;
};

const CountryList: React.FC<Props> = ({ search }) => {
  //! kullandığım stateler
  const [selectedItem, setSelectedItem] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [clickedCard, setClickedCard] = useState<boolean>(true);
  const [copyCountries, setCopyCountries] = useState<Country[]>([]);

  //! api den gelen veri
  const { loading, data } = useQuery<CountryListQuery>(GET_COUNTRY);

  //! apiden gelen veriyi kullanacağım state lere gönderdim
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

  //! filtreleme işlemi için girdiğim sorgu her değiştiğinde 
  //! gösterilecek değerleri ayarladım ve her sorguda gelen 10. veya
  //! son değeri renklendirdim
  useEffect(() => {
    const newArray = copyCountries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(newArray);
    setSelectedItem(
      newArray.length >= 10
        ? newArray[9]
        : newArray[newArray.length - 1]
    );
  }, [search]);

  //! oluşturduğum renk kümesinden her tıklamada farklı bir renk gelmesini sağladım
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  };


  //! tıklanan elemenın rengini değiştirme 
  const handleItemClick = (country: Country) => {
    if (selectedItem?.code.toLowerCase() !== country.code.toLowerCase()) {
      setClickedCard(true);
      setSelectedItem(country);
    } else {
      setClickedCard(false);
    }
  };

  //! veri gelmediyse loading i ekrana basma
  if (loading) return <Loader />;

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
