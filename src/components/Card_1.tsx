
interface Card_1Props {
    title: string,
    category: string
}

function Card_1({ title, category }: Card_1Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 shadow-md shadow-black/5 w-max">
        <p className="text-black text-xl font-[iranyekan300]">{ title }</p>
        <p className="text-black/70 text-base font-[iranyekan300]">{ category }</p>
    </div>
  )
}

export default Card_1