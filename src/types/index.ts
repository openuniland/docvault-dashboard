export interface URLparams {
  q?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface DataWithMeta<T> {
  data: T;
  meta: {
    total: number;
    currentPage: number;
    pageSize: number;
  };
}
