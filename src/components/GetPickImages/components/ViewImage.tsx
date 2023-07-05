
import { useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import DeleteButton from "./DeleteButton";

interface Props {
    image: string | File;
    onClick?(image: string | File),
    handleDeletelImage?(file: File | string): void;
}

function ViewImage({ image, onClick, handleDeletelImage }: Props) {

    const _image = image
    const handle = useFullScreenHandle()


    const handleClick = useCallback(
        () => {
            if (onClick) {
                onClick(_image)
            }
            handle.enter()
        },
        [image]
    )

    const handleDeteleButtonClick = () => {
        if (handleDeletelImage) handleDeletelImage(image)
    }

    return (
        <>
            <div className="relative select-none">
                <img
                    loading="lazy"
                    onClick={handleClick}
                    src={typeof _image === "string" ? _image : URL.createObjectURL(_image)}
                    alt=""
                    className="rounded-lg w-full aspect-square object-center object-cover outline outline-2 outline-gray-100"
                />
                <DeleteButton onClick={handleDeteleButtonClick} />
            </div>
            <FullScreen handle={handle} className="absolute -z-50">
                {
                    handle.active
                        ?
                        <div className="w-full h-full overflow-y-auto">
                            <img
                                loading="lazy"
                                src={typeof _image === "string" ? _image : URL.createObjectURL(_image)}
                                alt=""
                                className="rounded-lg w-full h-auto object-center object-cover"
                            />
                        </div>
                        :
                        null
                }
            </FullScreen>
        </>
    )
}

export default ViewImage