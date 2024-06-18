import { TrashIcon } from "@heroicons/react/16/solid";


export default function Column({title, children, ...rest}: {title: string, children: React.ReactNode, rest?: any}) {
  return (
    <div {...rest} draggable  className="flex rounded-md flex-col h-3/4 bg-mem w-96 gap-5">
    <div className="flex justify-between w-full items-center">
      <h1 className="text-xl p-2 font-bold">{title}</h1>
      <TrashIcon className="h-5 w-5 m-2 cursor-pointer" />
    </div>
    <div className="w-full p-3">
      {children}
    </div>
  </div>
  )
}
