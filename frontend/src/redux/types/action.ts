export type IAction = {
  next?: (...args: any) => void;
  errors?: any;
};

export type IPagination = {
  pageNum?: number;
  perPage?: number;
}