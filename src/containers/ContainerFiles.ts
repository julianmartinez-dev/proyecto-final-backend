import fs from "fs";

import { IContainer } from "../interfaces/containers";

export type IFileExtension = ".json" | ".txt";

abstract class ContainerFile implements IContainer {
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async read(): Promise<string> {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return data;
  }

  async write(data: string): Promise<void> {
    try {
      await fs.promises.writeFile(this.filePath, data);
    } catch (error) {
      throw new Error("Error writing file: " + error);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error deleting products: " + error);
    }
  }

  async deleteById(id: number): Promise<void> {
    const response = await fs.promises.readFile(this.filePath, "utf-8");
    const data = await JSON.parse(response);

    const idExist = data.some((p: { id: number }) => p.id === id);

    if (!idExist) {
      throw new Error("404 - ID DOESNT EXIST");
    }
    const newData = data.filter((p: { id: number }) => p.id !== id);

    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(newData, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ContainerFile;
