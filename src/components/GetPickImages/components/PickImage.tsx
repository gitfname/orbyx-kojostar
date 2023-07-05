import { AiOutlinePlus } from "react-icons/ai";
import { LuFileInput } from "react-icons/lu";

interface Props {
    onImage(image: File): void
}

function PickImage({ onImage }: Props) {

    const handleUploadImage = (file: File) => {
        if(onImage) {
            onImage(file)
        }
    }

    const pickImage = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file"
        fileInput.addEventListener("change", (e => {
            const file = (e.target as HTMLInputElement).files[0]
            if(file) {
                handleUploadImage(file)
            }
        }))
        fileInput.click()
    }

    return (
        <button onClick={pickImage} className="appearance-none grid aspect-square place-items-center bg-gray-100 rounded-xl">
            <div
                className="w-14 h-14 bg-blue-500 rounded-full cursor-pointer grid place-items-center"
            >
                <AiOutlinePlus className="w-7 h-7 fill-gray-50" />
            </div>
        </button>
    )
}

export default PickImage