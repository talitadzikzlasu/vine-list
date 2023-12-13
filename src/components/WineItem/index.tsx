import styles from "./WineItem.module.scss";
import { CircleFlag } from "react-circle-flags";
import { Rating } from "../Rating";
import { WineDetailsType } from "../../types";

type WineItemProps = {
  wineDetails: WineDetailsType;
};

export const WineItem = ({ wineDetails }: WineItemProps) => {
  const { wine, image } = wineDetails.vintage;
  return (
    <div className={styles.wineItem}>
      <div
        style={{
          backgroundImage: `url(${
            image.variations.bottle_small ?? "./bottle_placeholder_small.png"
          })`,
        }}
        className={styles.wineImage}
      ></div>
      <div className={styles.wineText}>
        <div className={styles.winery}>{wine.winery.name}</div>
        <div className={styles.name}>{wine.name}</div>
        <div className={styles.origin}>
          <CircleFlag countryCode={wine.region.country} height="24" />
          <span className={styles.region}>{wine.region.name}</span>
        </div>
      </div>
      <div className={styles.rating}>
        <Rating
          value={wine.statistics.ratings_average}
          count={wine.statistics.ratings_count}
        />
      </div>
    </div>
  );
};
