export interface Paginate<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecord: number;
  data?: T[];
}

export interface FilterOptions {
  departments?: string[];
  countries?: string[];
}
