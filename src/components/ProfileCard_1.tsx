
export default function ProfileCard_1({img="", title="", subtitle=""}) {
    
    return (
        <div className="mt-6 flex items-center gap-x-3.5">
            <img
                alt=""
                src={img}
                className="w-11 h-11 rounded-full object-center object-cover"
            />

            <div>
                <p
                    style={{
                        fontSize: "var(--testimotionals-card-1__username--font-size)",
                        fontFamily: "var(--testimotionals-card-1__username--font-family)"
                    }}
                    className="text-[--testimotionals-card-1__username--color] font-[--testimotionals-card-1__username--font-weight]"
                >
                    {title}
                </p>

                <p
                    style={{
                        fontSize: "var(--testimotionals-card-1__company--font-size)",
                        fontFamily: "var(--testimotionals-card-1__company--font-family)"
                    }}
                    className="mt-0.5 text-[--testimotionals-card-1__company--color] font-[--testimotionals-card-1__company--font-weight]"
                >
                    {subtitle}
                </p>
            </div>
        </div>
    )
}