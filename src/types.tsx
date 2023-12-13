export enum CountryCode {
  AR = "ar",
  AU = "au",
  AT = "at",
  CL = "cl",
  FR = "fr",
  DE = "de",
  IT = "it",
  PT = "pt",
  ZA = "za",
  ES = "es",
  US = "us",
}

export const countries: { code: CountryCode; name: string }[] = [
  {
    code: CountryCode.AR,
    name: "argentina",
  },
  {
    code: CountryCode.AU,
    name: "australia",
  },
  {
    code: CountryCode.AT,
    name: "austria",
  },
  {
    code: CountryCode.CL,
    name: "chile",
  },
  {
    code: CountryCode.FR,
    name: "france",
  },
  {
    code: CountryCode.DE,
    name: "germany",
  },
  {
    code: CountryCode.IT,
    name: "italy",
  },
  {
    code: CountryCode.PT,
    name: "portugal",
  },
  {
    code: CountryCode.ZA,
    name: "south africa",
  },
  {
    code: CountryCode.ES,
    name: "spain",
  },
  {
    code: CountryCode.US,
    name: "united states",
  },
];

export type WineDetailsType = {
  vintage: {
    id: string;
    image: { variations: { bottle_small: string } };
    wine: {
      winery: { name: string };
      name: string;
      region: { name: string; country: CountryCode };
      statistics: { ratings_average: number; ratings_count: number };
    };
  };
};
