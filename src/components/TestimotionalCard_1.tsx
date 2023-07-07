import ProfileCard_1 from "./ProfileCard_1";

export default function TestimotionalCard_1({ text, img, username, company }) {
    return (
        <div className="">
            <div
                className="max-sm:w-full sm:w-[32rem] rounded-3xl bg-[#3c3c3c]
            grid grid-cols-2 border border-slate-200 max-sm:min-h-[14rem]"
            >

                <div className="p-6 pl-2 flex flex-col gap-3.5">
                    <p
                        className="text-base font-[vazirMedium] text-white font-light leading-6 tracking-wide line-clamp-1"
                    >
                        {username}
                    </p>

                    <p
                        className="text-sm font-[vazir] text-white font-light leading-6 tracking-wide max-w-[45ch] line-clamp-5"
                    >
                        {text}
                    </p>
                </div>

                <div className="w-full h-full aspect-square bg-[#353535] rounded-l-3xl">
                    <img
                        loading="lazy"
                        alt={username}
                        src={img}
                        className="w-full h-full object-center object-cover rounded-l-3xl"
                    />
                </div>



            </div>
        </div>
    )
}