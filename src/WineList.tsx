import React from "react";
import { useQuery } from "react-query";

interface Wine {
  vintage: {
    name: string;
  };
}

const fetchWines = async () => {
  const response = await fetch(
    "https://corsproxy.io/?" +
      encodeURIComponent(
        "https://api.vivino.com/vintages/_explore?limit=50&q=cabernet%20sauvignon"
      )
  );
  const wines = (await response.json()).matches;
  return wines;
};

const WineList: React.FC = () => {
  const { data, isLoading } = useQuery("wines", fetchWines);

  return (
    <div>
      <h1>Wine List</h1>
      <ul>
        {data?.map((wine: any, index: number) => (
          <li key={index}>{wine.vintage.name}</li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default WineList;
