import { File } from "../../core/entities/file.entity";
import { StorageGateway } from "../../core/gateways/storage.gateway";

export class FakeStorageGateway implements StorageGateway {
    private files: Array<File> = []

    upload(path: string): Promise<File> {
        const file: File = {
            path: path
        }
        this.files.push(file)
        return Promise.resolve(file)
    }

    getFiles(): Promise<Array<File>> {
        return Promise.resolve(this.files)
    }

    feedWith(...files: Array<File>) {
        this.files = files
    }
}