import React, { useState } from "react";
import styles from "./FilterPanel.module.scss";
import { CountryCode, countries } from "./countries";

interface FilterPanelProps {
  onChange: (options: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (countryCode: string) => {
    setSelectedTags((prev) => {
      const updatedSelectedTags = [...prev];
      const index = updatedSelectedTags.indexOf(countryCode);
      if (index > -1) {
        updatedSelectedTags.splice(index, 1);
      } else {
        updatedSelectedTags.push(countryCode);
      }
      onChange(updatedSelectedTags);

      return updatedSelectedTags;
    });
  };

  return (
    <div>
      <div className={styles.tagsContainer}>
        {countries.map((country) => (
          <div
            key={country.code}
            className={`${styles.tag} ${
              selectedTags.includes(country.code) ? styles.selected : ""
            }`}
            onClick={() => handleTagClick(country.code)}
          >
            {country.name}
          </div>
        ))}
      </div>
    </div>
  );
};
