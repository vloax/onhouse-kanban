import React from 'react'

export default function ColumnContainer({children, }: {children: React.ReactNode}) {
  return (
    <div  className="flex flex-row w-fit max-h-3/4 gap-5 m-5 overflow-auto">
      {children}
    </div>
  )
}
