import { File } from "../../core/entities/file.entity";
import { StorageGateway } from "../../core/gateways/storage.gateway";

export class FakeStorageGateway implements StorageGateway {
    private files: Array<File> = []

    upload(name: string): Promise<File> {
        if(!/^[a-z\-]*$/.test(name)) {
            throw new Error('Bad image name')
        }

        const file: File = {
            name: name + '.png',
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