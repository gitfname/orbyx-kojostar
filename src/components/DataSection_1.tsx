
import { ClassNamesProps } from "@emotion/react";
import React, { ReactNode } from "react"
import { DefaultColors } from "tailwindcss/types/generated/colors";

interface Props {
  title: string,
  dataProvider: Array<any>,
  emptyFallback: ReactNode,
  isLoading: boolean,
  loading: ReactNode,
  dataRenderer(item: any): ReactNode,
  containerClassName?: string
}

function DataSection_1({ title, dataProvider, emptyFallback, isLoading, loading, dataRenderer, containerClassName }: Props) {
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
          dataProvider?.length > 0
            ?
            <div className={containerClassName}>
              {dataProvider.map(item => dataRenderer(item))}
            </div>
            :
            emptyFallback
      }
    </div>
  )
}

export default DataSection_1