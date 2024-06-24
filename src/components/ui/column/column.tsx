import { useColumns } from "@/contexts/columns-context";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface ColumnProps {
  title: string;
  children: React.ReactNode;
  onColumnDragOver?: (e: React.DragEvent) => void;
  onColumnDrop?: (e: React.DragEvent) => void;
  columnId: number;
  onColumnDragStart?: () => void;
  onCardDrop?: () => void;
}

export default function Column({ title, children, onColumnDragOver, onColumnDrop, columnId, onColumnDragStart, onCardDrop }: ColumnProps) {
  const { removeColumn } = useColumns();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
    if (onColumnDragOver) onColumnDragOver(e);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDraggingOver(false);
    if (onColumnDrop) onColumnDrop(e);
    if (onCardDrop) onCardDrop();
  };

  return (
    <div
      className={`flex rounded-md flex-col h-[80vh] min-w-64 md:min-w-80 w-96 gap-5 ${isDraggingOver ? "border-2 border-hem bg-mem" : "bg-mem"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable
      onDragStart={onColumnDragStart}
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="text-xl p-2 font-bold">{title}</h1>
        <TrashIcon onClick={() => removeColumn && removeColumn(columnId)} className="h-5 w-5 m-2 cursor-pointer" />
      </div>
      <div className="w-full p-3 overflow-y-auto max-h-full">
        {children}
      </div>
    </div>
  );
}
