export type Pagination = {
  offset: number;
  limit: number;
  total?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
};
