import { File } from "../entities/file.entity";

export interface StorageGateway {
    upload(path: string): Promise<File>
    getFiles(): Promise<Array<File>>
}