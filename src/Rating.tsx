import React from "react";
import styles from "./Rating.module.scss";

interface RatingProps {
  value: number;
  count: number;
}

const Rating: React.FC<RatingProps> = ({ value, count }) => {
  let starSize = value;

  return (
    <div className={styles.rating}>
      <span className={styles.text}>{value.toFixed(1)}</span>

      {[...Array(5)].map((_, i) => {
        return (
          <span key={i} className={styles.starItem}>
            <>
              <i className={`star fa fa-star ${styles.starUnder}`}></i>
              <i
                className={`star fa fa-star ${styles.starOver}`}
                style={{
                  width: `${Math.max(Math.min(starSize - i, 1), 0) * 100}%`,
                }}
              ></i>
            </>
          </span>
        );
      })}

      <span className={styles.text}>{`${count} ratings`}</span>
    </div>
  );
};

export default Rating;
