import { MdOutlineCancel } from "react-icons/md"


interface Props {
    onClick(): void
}

function DeleteButton({ onClick }: Props) {

    const handleClick = () => {
        if(onClick) onClick()
    }

    return (
        <div
            onClick={handleClick}
            className="absolute top-2 left-2 p-1.5 rounded-lg z-10
    hover:bg-transparent/10 bg-transparent/10 transition-all
    duration-300 backdrop-blur-md cursor-pointer px-2.5 active:scale-95"
        >
            <MdOutlineCancel className="w-6 h-6 fill-red-500" />
        </div>
    )
}

export default DeleteButton