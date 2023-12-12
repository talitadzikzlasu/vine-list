import React from "react";
import styles from "./Rating.module.scss";

interface RatingProps {
  value: number;
  count: number;
}

const Rating: React.FC<RatingProps> = ({ value, count }) => {
  return (
    <div className={styles.container}>
      <span className={styles.value}>{value.toFixed(1)}</span>
      <span className={styles.stars}>
        {[...Array(5)].map((_, i) => {
          return (
            <span key={i} className={styles.starItem}>
              <>
                {/* Empty star */}
                <i className={`star fa fa-star ${styles.starUnder}`} />

                {/* Filled star */}
                {/* The width of the filled star is determined by the difference between the starSize and the current index (i). 
                 The Math.max(Math.min(starSize - i, 1), 0) ensures that the width is between 0 and 1. 
                 If width is greater than or equal to 1, it will be fully painted, 
                 if it is less than or equal to 0, it is not painted. 
                 Otherwise, the proper percentage of the star is painted. */}
                <i
                  className={`star fa fa-star ${styles.starOver}`}
                  style={{
                    width: `${Math.max(Math.min(value - i, 1), 0) * 100}%`,
                  }}
                />
              </>
            </span>
          );
        })}
      </span>

      <span className={styles.count}>{`${count} ratings`}</span>
    </div>
  );
};

export default Rating;
