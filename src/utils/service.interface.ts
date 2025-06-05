export interface IService<T, R, U> {
  create(r: R): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  update(id: number, u: U): Promise<T>;
  remove(id: number): Promise<T>;
}
