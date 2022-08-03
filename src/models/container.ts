import fs from "fs";

import { IProduct } from "../interfaces/product";

export type IFileExtension = ".json" | ".txt";

abstract class Container {
  file: string;
  constructor(public fileName: string, public fileExtension: IFileExtension) {
    this.file = fileName + fileExtension;
    if (fs.existsSync(this.file)) return;
    fs.promises.writeFile(this.file, JSON.stringify([]));
  }

  //   abstract save(data : any): Promise<number>;
  abstract getProduct(): Promise<IProduct | null>;
  abstract deleteAll(): Promise<void>;
  abstract deleteById(id: number): Promise<void>;
}

export default Container;
