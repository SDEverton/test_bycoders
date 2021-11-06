interface IStorageProvider {
  save(file: string, folder: string): Promise<string>;
  find(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
