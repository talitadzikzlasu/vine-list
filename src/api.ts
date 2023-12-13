import { WineDetailsType } from "./types";

export const fetchWines = async (
  filterOptions: string[]
): Promise<WineDetailsType[]> => {
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
