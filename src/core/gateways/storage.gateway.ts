import { File } from "../entities/file.entity";

export interface StorageGateway {
    upload(name: string): Promise<File>
    getFiles(): Promise<Array<File>>
}