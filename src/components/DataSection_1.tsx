
import { ReactNode } from "react"

interface Props {
  title: string,
  dataProvider: Array<any>,
  emptyFallback: ReactNode,
  isLoading: boolean,
  loading: ReactNode,
  dataRenderer(item: any): ReactNode
}

function DataSection_1({ title, dataProvider, emptyFallback, isLoading, loading, dataRenderer }: Props) {

  return (
    <div className="w-full">
      <p
        className="text-xl text-slate-800/90 tracking-wide font-[iranyekan500]"
      >
        {title}
      </p>

      {
        isLoading
          ?
          loading
          :
          dataProvider.length > 0
            ?
            <div className="space-y-5">
              {dataProvider.map(item => dataRenderer(item))}
            </div>
            :
            emptyFallback
      }
    </div>
  )
}

export default DataSection_1