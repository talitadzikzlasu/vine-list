import React from "react";
import { useQuery } from "react-query";
import styles from "./WineList.module.scss";
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
    <>
      <h1>Wine List</h1>
      <ul>
        {data?.map((wine: any, index: number) => (
          <li key={wine.vintage.id}>
            <div className={styles.wineItem}>
              <div
                style={{
                  backgroundImage: `url(${wine.vintage.image.variations.bottle_small})`,
                }}
                className={styles.wineImage}
              ></div>
              <p>{wine.vintage.wine.winery.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WineList;
