// context/ColumnsContext.tsx
'use client';

import { ICard } from '@/interfaces/ICard';
import ColumnsContextType from '@/interfaces/IColumns';
import IColunas from '@/interfaces/IColunas';
import { GetLocalStorage, SetLocalStorage } from '@/utils/handle-storage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const ColumnsContext = createContext<ColumnsContextType | undefined>(undefined);

export const ColumnsProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<IColunas[]>([]);

  useEffect(() => {
    const storedColumns = GetLocalStorage('columns');
    if (storedColumns) {
      setColumns(storedColumns);
    }
  }, []);

  const updateColumns = (newColumns: IColunas[]) => {
    newColumns.forEach((column, index) => {
      column.conclusionPercentage = Math.ceil(((index / (newColumns.length - 1)) * 100));
      column.cards.forEach(card => {
        card.porcentagemConclusao = column.conclusionPercentage;
      });
    });
    SetLocalStorage('columns', newColumns);
    setColumns(newColumns);
  };

  const addCardToColumn = (columnId: number, card: ICard) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        const newCard = { ...card, porcentagemConclusao: column.conclusionPercentage };
        return { ...column, cards: [...column.cards, newCard] };
      }
      return column;
    });
    updateColumns(updatedColumns);
  };
  

  const moveCardToColumn = (fromColumnId: number, toColumnId: number, cardId: number) => {
    setColumns(prevColumns => {
      const fromColumn = prevColumns.find(column => column.id === fromColumnId);
      const toColumn = prevColumns.find(column => column.id === toColumnId);
      const card = fromColumn?.cards.find(card => card.id === cardId);
  
      if (fromColumn === toColumn) {
        return prevColumns;
      }
  
      if (fromColumn && toColumn && card) {
        const updatedCard = { ...card, colunaId: toColumnId, porcentagemConclusao: toColumn.conclusionPercentage };
        return prevColumns.map(column => {
          if (column.id === fromColumnId) {
            return { ...column, cards: column.cards.filter(card => card.id !== cardId) };
          }
          if (column.id === toColumnId) {
            return { ...column, cards: [...column.cards, updatedCard] };
          }
          return column;
        });
      }
  
      return prevColumns;
    });
  };
  
  const moveColumn = (fromColumnId: number, toColumnId: number) => {
    const fromColumnIndex = columns.findIndex(column => column.id === fromColumnId);
    const toColumnIndex = columns.findIndex(column => column.id === toColumnId);
    const updatedColumns = [...columns];
    const [removedColumn] = updatedColumns.splice(fromColumnIndex, 1);
    updatedColumns.splice(toColumnIndex, 0, removedColumn);
    updateColumns(updatedColumns);
  };

  const removeColumn = (columnId: number) => {
    const updatedColumns = columns.filter(column => column.id !== columnId);
    updateColumns(updatedColumns);
  };

  const removeCard = (columnId: number, cardId: number) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: column.cards.filter(card => card.id !== cardId) };
      }
      return column;
    });
    updateColumns(updatedColumns);
  };

  const findOneCardById = (cardId: number) => {
    let card: ICard | null = null;
    columns.forEach(column => {
      column.cards.forEach(c => {
        if (c.id === cardId) {
          card = c;
        }
      });
    });
    return card;
  };

  const updateCard = (cardId: number, updatedFields: Partial<ICard>) => {
    const updatedColumns = columns.map(column => {
      const updatedCards = column.cards.map(card => {
        if (card.id === cardId) {
          return { ...card, ...updatedFields };
        }
        return card;
      });
      return { ...column, cards: updatedCards };
    });
    updateColumns(updatedColumns);
  };

  return (
    <ColumnsContext.Provider value={{ columns, setColumns: updateColumns, addCardToColumn, moveCardToColumn, removeColumn, removeCard, moveColumn, findOneCardById, updateCard }}>
      {children}
    </ColumnsContext.Provider>
  );
};

export const useColumns = () => {
  const context = useContext(ColumnsContext);
  if (context === undefined) {
    throw new Error('useColumns must be used within a ColumnsProvider');
  }
  return context;
};
