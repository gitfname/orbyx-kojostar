
function Loading() {

  return (
    <div className="w-full h-screen bg-gray-950 grid place-items-center">
        <p className="text-7xl tracking-wide text-gray-50 loading-container">
            <span
                style={{["--delay" as any]: "1.2s", ["--duration" as any]: "1s", ["--trx" as any]: "-2rem"}}
                className="fadein-x-anim"
            >
                <span>O</span></span>
            <span
                style={{["--delay" as any]: ["1.4s" as any], ["--duration" as any]: "1s", ["--trx" as any]: "-1.6rem"}}
                className="fadein-x-anim"
            ><span>r</span></span>
            <span
                style={{["--delay" as any]: "1.6s", ["--duration" as any]: "1s", ["--trx" as any]: "-1.2rem"}}
                className="fadein-x-anim"
            ><span>b</span></span>
            <span
                style={{["--delay" as any]: "1.8s", ["--duration" as any]: "1s", ["--trx" as any]: "-0.8rem"}}
                className="fadein-x-anim"
            ><span>y</span></span>
            <span
                style={{["--delay" as any]: "2s", ["--duration" as any]: "1s", ["--trx" as any]: "-0.4rem"}}
                className="fadein-x-anim"
            ><span>x</span></span>
        </p>
    </div>
  )
}

export default Loading