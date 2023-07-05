import { useEffect, useState } from "react"
import ViewImage from "./components/ViewImage"
import PickImage from "./components/PickImage"

interface Props {
    initialImages: Array<string>;
    onChange(oldImage: Array<string>, newImages:Array<File>): void
}

function GetPickImages({ initialImages, onChange }: Props) {

    const [oldImages, setOldImages] = useState<Array<string>>([])
    const [uploadedImages, setUploadedImages] = useState<Array<File>>([])
    const [images, setImages] = useState<Array<File | string>>([])

    const onImage = (file: File) => {
        setUploadedImages(prev => [...prev, file])
    }

    const onDeleteImage = (file: File|string) => {
        if(typeof file === "object") {
            setUploadedImages(prev => prev.filter(image => image.name !== file.name))
        }
        else {
            setOldImages(prev => prev.filter(image => image !== file))
        }
    }

    useEffect(
        () => {
            if (initialImages) {
                setOldImages(initialImages)
            }
        },
        [initialImages]
    )

    useEffect(
        () => {
            setImages([...oldImages, ...uploadedImages])

            if(onChange) onChange(oldImages, uploadedImages)
        },
        [oldImages, uploadedImages]
    )

    return (
        <div className="w-full grid grid-cols-3 gap-6">
            {
                images?.map(image => <ViewImage handleDeletelImage={onDeleteImage} image={image} />)
            }
            {
                images?.length < 6
                    ?
                    <PickImage onImage={onImage} />
                    :
                    null
            }
        </div>
    )

}

export default GetPickImages