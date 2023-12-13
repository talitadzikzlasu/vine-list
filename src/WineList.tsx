import { useState } from "react";
import { useQuery } from "react-query";
import { WineItem } from "./WineItem";
import { FilterPanel } from "./FilterPanel";
import { WineItemSkeleton } from "./WineItemSkeleton";
import styles from "./WineList.module.scss";
import { fetchWines } from "./api";
import { CountryCode } from "./countries";

const WineList = () => {
  const [filterOptions, setFilterOptions] = useState<CountryCode[]>([]);
  const { data, isLoading, error } = useQuery(["wines", filterOptions], () =>
    fetchWines(filterOptions)
  );

  const handleFilterChange = (options: CountryCode[]) => {
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
        <div className={styles.listInfo}>
          Error loading wines. Please try again later.
        </div>
      );

    if (data && data.length > 0)
      return data.map((wine: any) => (
        <li key={wine.vintage.id}>
          <WineItem wine={wine} />
        </li>
      ));

    return (
      <div className={styles.listInfo}>
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
