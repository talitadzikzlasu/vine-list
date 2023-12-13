import React from "react";
import styles from "./WineItem.module.scss";
import { CircleFlag } from "react-circle-flags";
import Rating from "./Rating";
import { WineDetailsType } from "./types";

type WineItemProps = {
  wine: WineDetailsType;
};

export const WineItem = ({ wine }: WineItemProps) => {
  return (
    <div className={styles.wineItem}>
      <div
        style={{
          backgroundImage: `url(${
            wine.vintage.image.variations.bottle_small ??
            "./bottle_placeholder_small.png"
          })`,
        }}
        className={styles.wineImage}
      ></div>
      <div className={styles.wineText}>
        <div className={styles.winery}>{wine.vintage.wine.winery.name}</div>
        <div className={styles.name}>{wine.vintage.wine.name}</div>
        <div className={styles.origin}>
          <CircleFlag
            countryCode={wine.vintage.wine.region.country}
            height="24"
          />
          <span className={styles.region}>{wine.vintage.wine.region.name}</span>
        </div>
      </div>
      <div className={styles.rating}>
        <Rating
          value={wine.vintage.wine.statistics.ratings_average}
          count={wine.vintage.wine.statistics.ratings_count}
        />
      </div>
    </div>
  );
};
