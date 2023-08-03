
import { ReactNode, Ref, useRef, useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import { addNewJobApiUrl } from "../constants"
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { FilePondErrorDescription, FilePondFile } from "filepond"
import useUserStore from "../stores/userStore"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



interface FileUploadProps {
    beforeSend?(): void,
    name: string,
    filePondRef(filePond: FilePond): void,
    reqHeaders?: {}
}

function FileUpload({ reqHeaders, beforeSend = undefined, name = "filepondfile", filePondRef = undefined }: FileUploadProps) {
    const [files, setFiles] = useState<FilePondFile[]>(undefined)
    const filePondInstance = useRef<FilePond>(undefined);

    const initFilePond = () => {
        filePondRef(filePondInstance.current)
    }

    const handleAddFiles = (error: FilePondErrorDescription, file: FilePondFile) => {
        if (files && !error) {
            filePondInstance.current.addFile(file.file)
        }
    }

    const handleProcessFiles = () => {
        filePondInstance.current.processFiles()
    }

    const handleProcess = (fieldName, file, metadata, load, error, progress, abort) => {
        const formData = new FormData();
        formData.append(fieldName, file, metadata.name);

        const headers = reqHeaders

        return {
            abort,
            headers: headers,
            formData,
            progress: (fileSize, uploadedSize) => {
                progress(true, uploadedSize, fileSize);
            },
            load,
            error,
        };
    }

    return (
        <FilePond
            oninit={initFilePond}
            ref={filePondInstance}
            files={files?.map(file => file?.file)}
            server={{
                process: ""
            }}
            onupdatefiles={(files: FilePondFile[]) => setFiles(files)}
            allowMultiple
            maxFiles={3}
            name={name}
            instantUpload={false}
            onaddfile={handleAddFiles}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
    )
}

export default FileUpload