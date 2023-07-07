import { useEffect } from "react"

function InitialAppLoading() {
    useEffect(
        () => {
            document.title = import.meta.env.VITE_COMPANY_NAME
        },
        []
    )
    return (
        <div className="w-full h-screen bg-gray-950 grid place-items-center">
            <p dir="ltr" className="text-7xl tracking-wide text-gray-50 loading-container">
                <span
                    style={{ ["--delay" as any]: "1.2s", ["--duration" as any]: "1s", ["--trx" as any]: "-2rem" }}
                    className="fadein-x-anim"
                >
                    <span>K</span></span>
                <span
                    style={{ ["--delay" as any]: ["1.4s" as any], ["--duration" as any]: "1s", ["--trx" as any]: "-1.6rem" }}
                    className="fadein-x-anim"
                ><span>O</span></span>
                <span
                    style={{ ["--delay" as any]: "1.6s", ["--duration" as any]: "1s", ["--trx" as any]: "-1.2rem" }}
                    className="fadein-x-anim"
                ><span>J</span></span>
                <span
                    style={{ ["--delay" as any]: "1.8s", ["--duration" as any]: "1s", ["--trx" as any]: "-1rem" }}
                    className="fadein-x-anim"
                ><span>O</span></span>
            </p>

            <p className="text-sm text-gray-300 fixed bottom-2.5 left-2.5 font-[vazirLight] py-1 px-2.5 bg-white/5 rounded-lg">
                powerd by <span className="text-gray-50 font-[vazirMedium]">Orbyx</span>
            </p>
        </div>
    )
}

export default InitialAppLoading