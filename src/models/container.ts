import fs from "fs";

export type IFileExtension = ".json" | ".txt";

abstract class Container {
  file: string;
  constructor(public fileName: string, public fileExtension: IFileExtension) {
    this.file = fileName + fileExtension;
    if (fs.existsSync(this.file)) return;
    fs.promises.writeFile(this.file, JSON.stringify([]));
  }
}

export default Container;
