declare interface Locale {
  locale: string;
}

interface TokenGeneratorParams {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  length: number;
  exclude?: string;
}
