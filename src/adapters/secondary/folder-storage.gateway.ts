import { File } from './../../core/entities/file.entity';
import { File as FormidableFile } from 'formidable'
import { StorageGateway } from "../../core/gateways/storage.gateway";
import * as fs from 'fs'

export class FolderStorageGateway implements StorageGateway {
    private file?: FormidableFile

    constructor(file?: FormidableFile) {
        this.file = file
    }

    upload(name: string): Promise<File> {
        if(!this.file) {
            throw Error('File not defined')
        }
        
        if(!/^[a-z\-]*$/.test(name)) {
            throw new Error('Bad image name')
        }

        const mimeTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']
        if(!this.file.mimetype || !mimeTypes.includes(this.file.mimetype)) {
            throw new Error('Bad mimetype')
        }

        const extension = this.file.mimetype == 'image/jpeg' ? 'jpg' 
            : (this.file.mimetype == 'image/png' ? 'png' 
                : (this.file.mimetype == 'image/gif' ? 'gif' 
                    : (this.file.mimetype == 'image/svg+xml' ? 'svg' 
                        : 'png')))

        fs.rename(this.file.filepath, `uploads/${name}.${extension}`, (err) => {});

        const file: File = {
            name: `${name}.${extension}`
        }
        return Promise.resolve(file)
    }

    getFiles(): Promise<Array<File>> {
        throw new Error('Not allowed')
    }
}