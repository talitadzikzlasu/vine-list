import React, { useState } from "react";
import { useQuery } from "react-query";
import { WineItem } from "./WineItem";
import { FilterPanel } from "./FilterPanel";
import { WineItemSkeleton } from "./WineItemSkeleton";
import styles from "./WineList.module.scss";

const fetchWines = async (filterOptions: string[]) => {
  let params = new URLSearchParams();
  const baseQueryString = "puglia";

  if (filterOptions.length > 0) {
    filterOptions.forEach((code) => {
      params.append("country_codes[]", code);
    });
  } else {
    params.append("q", baseQueryString);
  }

  const url = `https://corsproxy.io/?${encodeURIComponent(
    `https://api.vivino.com/vintages/_explore?limit=50&${params.toString()}`
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch wines");
  }
  return (await response.json()).matches;
};

const WineList: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const { data, isLoading, error } = useQuery(["wines", filterOptions], () =>
    fetchWines(filterOptions)
  );

  const handleFilterChange = (options: string[]) => {
    setFilterOptions(options);
  };

  const renderWineList = () => {
    if (isLoading)
      return (
        <>
          <WineItemSkeleton />
          <WineItemSkeleton />
          <WineItemSkeleton />
        </>
      );
    if (error)
      return (
        <div className={styles.emptyListText}>
          Error loading wines. Please try again later.
        </div>
      );
    if (data && data.length > 0)
      return data.map((wine: any, index: number) => (
        <li key={wine.vintage.id}>
          <WineItem wine={wine} />
        </li>
      ));
    return (
      <div className={styles.emptyListText}>
        <p>No wines found</p>
        <div>
          No wines matched your search. Please adjust your filters or check back
          with us later for more exquisite selections.
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wineListContainer}>
      <FilterPanel onChange={handleFilterChange} />
      <ul>{renderWineList()}</ul>
    </div>
  );
};

export default WineList;
