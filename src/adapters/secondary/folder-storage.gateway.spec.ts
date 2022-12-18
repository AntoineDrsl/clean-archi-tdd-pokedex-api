import { File } from 'formidable';
import { FolderStorageGateway } from './folder-storage.gateway';
import * as fs from 'fs'

describe('Upload file in folder', () => {
    const originalFilePath = __dirname + '/test.gif'
    const uploadFilePath = __dirname + '/../../../uploads/test.gif'

    describe('Throw errors', () => {
        it('should throw an error if upload without file', () => {
            const folderStorageGateway = new FolderStorageGateway()
            expect(async () => await folderStorageGateway.upload('test')).rejects.toThrow(Error)
        })
        it('should throw an error if getFiles is called', () => {
            const file = mockFile(originalFilePath)
            const folderStorageGateway = new FolderStorageGateway(file)
            expect(async () => await folderStorageGateway.getFiles()).rejects.toThrow(Error)
        })
        it('should throw an error if image name contains invalid characters', () => {
            const file = mockFile(originalFilePath)
            const folderStorageGateway = new FolderStorageGateway(file)
            expect(async () => await folderStorageGateway.upload('test*')).rejects.toThrow(Error)
        })
        it('should throw an error if image name contains invalid characters', () => {
            const file = mockFile(originalFilePath, 'application/pdf')
            const folderStorageGateway = new FolderStorageGateway(file)
            expect(async () => await folderStorageGateway.upload('test')).rejects.toThrow(Error)
        })
    })

    describe('Upload file', () => {
        it('should upload file', async () => {
            fs.writeFileSync(originalFilePath, 'test')
    
            const file = mockFile(originalFilePath)
            const folderStorageGateway = new FolderStorageGateway(file)
            folderStorageGateway.upload('test').then(() => {
                expect(fs.existsSync(uploadFilePath)).toBe(true);
                fs.unlinkSync(uploadFilePath);
            })
        })
    })
})

function mockFile(filepath, mimetype = 'image/gif') {
    return {
        size: 1024,
        filepath: filepath,
        originalFilename: '',
        newFilename: '',
        mimetype: mimetype,
        hashAlgorithm: 'md5',
        toJSON: () => {
            return { size: 1024,
                filepath: '',
                originalFilename: '',
                newFilename: '',
                mimetype: mimetype,
                hashAlgorithm: 'md5', 
                length: 2, 
                mtime: new Date() 
            }
        },
    } as File
};