
interface Props {
    text: string;
    img: string;
}

function FeatureCard_1({ img, text }: Props) {
  return (
    <div className="flex items-center gap-x-3">

        <img
            alt=""
            src={img}
            className="w-5 h-5 object-center object-cover"
        />

        <p
            className="text-sm text-slate-800 font-[vazir]"
        >
            {text}
        </p>

    </div>
  )
}

export default FeatureCard_1