import React from "react";
import styles from "./WineItemSkeleton.module.scss";

export const WineItemSkeleton = () => {
  return (
    <div className={styles.wineItemSkeleton}>
      <div className={styles.wineImageSkeleton}></div>
      <div className={styles.wineTextSkeleton}>
        <div className={styles.text}></div>
        <div className={styles.text}></div>
        <div className={styles.text}></div>
      </div>
      <div className={styles.ratingSkeleton}></div>
    </div>
  );
};
