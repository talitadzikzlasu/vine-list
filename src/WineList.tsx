import React, { useState } from "react";
import { useQuery } from "react-query";
import { WineItem } from "./WineItem";
import { FilterPanel } from "./FilterPanel";
import { WineItemSkeleton } from "./WineItemSkeleton";
import styles from "./WineList.module.scss";

const fetchWines = async (filterOptions: any) => {
  let countryCodes = "q=pugliadfd";
  if (filterOptions.length > 0)
    countryCodes = filterOptions
      .map((code: string) => `country_codes[]=${code}`)
      .join("&");

  console.log(countryCodes);
  const response = await fetch(
    "https://corsproxy.io/?" +
      encodeURIComponent(
        `https://api.vivino.com/vintages/_explore?limit=50&${countryCodes}`
      )
  );
  const wines = (await response.json()).matches;
  return wines;
};

const WineList: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const { data, isLoading } = useQuery(["wines", filterOptions], () =>
    fetchWines(filterOptions)
  );

  const handleFilterChange = (options: any) => {
    setFilterOptions(options);
  };

  return (
    <div style={{ width: "100%" }} className={styles.wineListContainer}>
      <FilterPanel onChange={handleFilterChange} />
      {isLoading ? (
        <ul>
          <li>
            <WineItemSkeleton />
          </li>
          <li>
            <WineItemSkeleton />
          </li>
          <li>
            <WineItemSkeleton />
          </li>
        </ul>
      ) : data.length > 0 ? (
        <ul>
          {data?.map((wine: any, index: number) => (
            <li key={wine.vintage.id}>
              <WineItem wine={wine} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyListText}>
          <p>No wines found</p>
          <div>
            No wines matched your search. Please adjust your filters or check
            back with us later for more exquisite selections.
          </div>
        </div>
      )}
    </div>
  );
};

export default WineList;
