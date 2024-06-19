'use client';

import PlusIcon from "@/components/icons/plus-icon";
import { useColumns } from "@/contexts/columns-context";
import { ICard } from "@/interfaces/ICard";
import IColunas from "@/interfaces/IColunas";
import { useState } from "react";
import Card from "../card/card";
import Column from "./column";
import ColumnContainer from "./column-container";

export default function AppColumns() {
  const { columns, addCardToColumn, moveCardToColumn } = useColumns();
  const [cardText, setCardText] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);
  const [draggingCard, setDraggingCard] = useState<ICard | null>(null);
  const [isDraggingOverCard, setIsDraggingOverCard] = useState<number | null>(null);

  const handleAddCard = (columnId: number) => {
    if (cardText.trim() === '') return;
    const newCard: ICard = { id: Date.now(), titulo: cardText, descricao: cardDescription, data: new Date().toISOString(), colunaId: columnId };
    addCardToColumn(columnId, newCard);
    setCardText('');
    setCardDescription('');
    setActiveColumnId(null);
  };

  const handleDragStart = (card: ICard) => {
    setDraggingCard(card);
  };

  const handleDragEnter = (cardId: number) => {
    setIsDraggingOverCard(cardId);
  };

  const handleDragLeave = () => {
    setIsDraggingOverCard(null);
  };

  const handleDrop = (columnId: number) => {
    if (draggingCard) {
      moveCardToColumn(draggingCard.colunaId, columnId, draggingCard.id);
      setDraggingCard(null);
      setIsDraggingOverCard(null);
    }
  };

  return (
    <ColumnContainer>
      {columns?.map((column: IColunas) => (
        <Column
          columnId={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(column.id)}
          key={column.id}
          title={column.nome}
        >
          <button
            className="w-full flex items-center justify-center text-center border-2 p-2 rounded-md gap-2 mb-2 mt-[-10px]"
            onClick={() => setActiveColumnId(column.id)}
          >
            <PlusIcon />
            Adicionar card
          </button>
          {activeColumnId === column.id && (
            <div className="animate-fade animate-once animate-ease-linear duration-100 mt-3 bg-gray-600 p-4 my-4 rounded-md border-2 ">
              <input
                type="text"
                value={cardText}
                onChange={(e) => setCardText(e.target.value)}
                placeholder="Título do card"
                className="w-full mb-2 p-2 border bg-bgcool rounded-md"
              />
              <input
                type="text"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                placeholder="Descrição do card"
                className="w-full p-2 border bg-bgcool rounded-md"
              />
              <div className="
                flex flex-row gap-2 
              " >
              <button
                onClick={() => handleAddCard(column.id)}
                className="w-full mt-2 bg-green-500 text-white p-2 rounded-md"
              >
                Adicionar
              </button>
              <button className="
                w-full mt-2 bg-red-500 text-white p-2 rounded-md"
                onClick={() => setActiveColumnId(null)}
                >
                Cancelar
              </button>
              </div>
            </div>
          )}
          {column.cards?.map((card) => (
            <>
            <Card
              card={card}
              columnId={column.id}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDragLeave={handleDragLeave}
              isDraggingOverCard={isDraggingOverCard}
              draggingCard={draggingCard}
            />
        
            {isDraggingOverCard === card.id && (
                <div className="w-full h-1 mt-4 bg-blue-500 rounded-md" />
             )}
        </>
          ))}


        </Column>
      ))}
    </ColumnContainer>
  );
}
