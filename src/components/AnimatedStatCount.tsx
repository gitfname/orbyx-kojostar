import { useEffect, useRef, useState  } from "react"

interface props {
    start?: number,
    end?: number,
    speed?: number,
    className?: string,
    counterClassName?: string
}

function AnimatedStatCount({ start=0, end=100, speed=100, className="", counterClassName="" }: props) {
    const [count, setCount] = useState(start)
    const containerRef:any = useRef()
    const [intervalId, setIntervalId] = useState()

    if(count >= end) clearInterval(intervalId)

    useEffect(
        () => {
            let id: any
            const observer = new IntersectionObserver((entries) => {

                if(entries[0].isIntersecting) {
                    observer.disconnect()
                    id = setInterval(() => {
                        setCount(count => count + 1)
                    }, speed);
                    setIntervalId(id)
                }

            })

            observer.observe(containerRef.current)

            return () => {
                observer.disconnect()
                clearInterval(id)
            }
        },
        []
    )

    return (
        <div
            ref={containerRef}
            className={
                ""
                + " " + className
            }
        >
            <p
                className={
                    "text-xl text-white font-bold"
                    + " " + counterClassName 
                }
            >
                {count}
            </p>
        </div>
    )
}

export default AnimatedStatCount