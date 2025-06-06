export interface ICrudTemplate<T, R, U> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(r: R): Promise<T>;
  update(id: number, u: U): Promise<T>;
  remove(id: number): Promise<T>;
}
