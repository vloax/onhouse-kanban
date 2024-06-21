'use client';

import { useColumns } from "@/contexts/columns-context";
import { ICard } from "@/interfaces/ICard";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import DialogCardView from "../dialog/dialog-card-view";

export default function Card(
  {
    card,
    columnId,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    isDraggingOverCard,
    draggingCard
  }:
  {
    card: ICard,
    columnId: number,
    handleDragStart: (card: ICard) => void,
    handleDragEnter: (cardId: number) => void,
    handleDragLeave: () => void,
    isDraggingOverCard: number | null,
    draggingCard: ICard | null
  }
) {
  const { removeCard } = useColumns();

  const [open, setOpen] = useState(false)

  return (
    <>
    <div
    onDragStart={() => handleDragStart(card)}
    onDragEnter={() => handleDragEnter(card.id)}
    onDragLeave={handleDragLeave}
    onClick={() => setOpen(true)}
    draggable
    key={card.id}
    className={`animate-once animate-fade bg-[#2C2C2C] p-2 mb-2 flex flex-col rounded-md shadow-md ${isDraggingOverCard === card.id ? "border-2 border-blue-500" : ""} ${card.id == draggingCard?.id ? "opacity-100 border-2 border-blue-400" : ""} ${card.porcentagemConclusao === 100 ? "border-[2px] border-green-400" : card.porcentagemConclusao === 0 ? "border-[2px] border-red-400" : "border-[2px] border-yellow-400"}`}
  >
    <div className="flex justify-between cursor-pointer">
      <h1 className="text-lg font-bold">{card.titulo}</h1>
      <div  className="flex-row gap-2 flex items-center">
        <p className="text-zinc-700 flex flex-row items-center gap-1">
          <CheckBadgeIcon className="h-4 w-4" />
          {card.porcentagemConclusao}% 
        </p>
        <TrashIcon onClick={() => {
          removeCard && removeCard(columnId, card.id)
        }} className="h-4 w-4 " />
      </div>
    </div>
    <p className="text-sm">{card.descricao}</p>
    <div className="flex justify-between">
      <p className="text-xs pt-2 text-gray-400">{new Date(card.data).toLocaleDateString()}</p>
      <div className="flex gap-1">
        {card?.tags?.map((tag, index) => (
          <div key={index} className="bg-[#2C2C2C] text-xs p-1 rounded-md" style={{ backgroundColor: tag.color }}>
            {tag.text}
          </div>
        ))}
      </div>
      </div>
  </div>
  <DialogCardView open={open} setOpen={setOpen} cardId={card.id} />
  </>
  )
}
