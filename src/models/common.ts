
export interface Option {
  label: string;
  value: string;
}

export type OptionType = { [key: string]: any };
export type OptionsType = Array<OptionType>;

export interface Paginate<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecord: number;
  data?: T[];
}