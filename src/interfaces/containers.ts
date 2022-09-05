export interface IContainer {
  read(): Promise<string>;
  write(data: string): Promise<void>;
  deleteAll(): Promise<void>;
  deleteById(id: number): Promise<void>;
}
