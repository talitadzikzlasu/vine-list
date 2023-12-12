import React from "react";
import { useQuery } from "react-query";
import styles from "./WineList.module.scss";
import { CircleFlag } from "react-circle-flags";
import Rating from "./Rating";

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
    <div style={{ width: "100%" }}>
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
              <div className={styles.wineText}>
                <div className={styles.winery}>
                  {wine.vintage.wine.winery.name}
                </div>
                <div className={styles.name}>{wine.vintage.wine.name}</div>
                <div className={styles.origin}>
                  <CircleFlag
                    countryCode={wine.vintage.wine.region.country}
                    height="24"
                  />
                  <span className={styles.region}>
                    {wine.vintage.wine.region.name}
                  </span>
                </div>
              </div>
              <div className={styles.rating}>
                <Rating
                  value={wine.vintage.wine.statistics.ratings_average}
                  count={wine.vintage.wine.statistics.ratings_count}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WineList;
