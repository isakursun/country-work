//! sorgu ayarları
import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
  query GetCountries {
    countries {
      code
      currency
      name
      capital
      phone
      languages {
        name
      }
    }
  }
`;

//! kullanılacak renk değerleri
export const colorOptions = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FFA07A",
  "#00FFFF",
  "#8A2BE2",
  "#FFD700",
  "#3CB371",
  "#FF6347",
  "#8B008B",
  "#20B2AA",
  "#FF8C00",
  "#48D1CC",
  "#C71585",
  "#9ACD32",
  "#1E90FF",
  "#FF4500",
  "#87CEEB",
  "#FF1493",
  "#00FA9A",
  "#FF00FF",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF0000",
  "#00FFFF",
  "#8B4513",
  "#8B4569",
  "#2F4F4F",
];
