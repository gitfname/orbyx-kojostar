import React from "react";
import { colors } from "../../../utils/colors"

interface Props {
    bgColor?: string;
    textColor?: string;
    text: string;
    onCLick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    img?: string;
}

function CTA_1({
    bgColor = colors.blue[500],
    text,
    onCLick,
    img,
    textColor = colors.gray[50]
}: Props) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onCLick) onCLick(e)
    }

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: bgColor,
                color: textColor
            }}
            className={`w-full transition-all duration-300 active:scale-95 rounded-3xl flex items-center justify-center font-[vazirThin] p-2 relative`}
        >

            {text}

            {
                img
                    ?
                    <div className="absolute top-1/2 left-4 -translate-y-1/2">
                        <img
                            loading="lazy"
                            alt=""
                            src={img}
                            className="w-12 h-auto object-center object-scale-down"
                        />
                    </div>
                    :
                    null
            }


        </button>
    )
}

export default CTA_1