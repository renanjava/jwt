export interface IRepository<T, R, U> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(r: R): Promise<T>;
  update(id: number, u: U): Promise<T | null>;
  remove(id: number): Promise<T | null>;
}
