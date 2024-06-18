// context/ColumnsContext.tsx
'use client';

import ICard from '@/interfaces/ICard';
import IColunas from '@/interfaces/IColunas';
import { GetLocalStorage, SetLocalStorage } from '@/utils/handle-storage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ColumnsContextType {
  columns: IColunas[];
  setColumns: (columns: IColunas[]) => void;
  addCardToColumn: (columnId: number, card: ICard) => void;
  moveCardToColumn: (fromColumnId: number, toColumnId: number, cardId: number) => void;
}

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
    SetLocalStorage('columns', newColumns);
    setColumns(newColumns);
  };

  const addCardToColumn = (columnId: number, card: ICard) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: [...column.cards, card] };
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

      if (fromColumn && toColumn && card) {
        return prevColumns.map(column => {
          if (column.id === fromColumnId) {
            return { ...column, cards: column.cards.filter(card => card.id !== cardId) };
          }
          if (column.id === toColumnId) {
            return { ...column, cards: [...column.cards, { ...card, colunaId: toColumnId }] };
          }
          return column;
        });
      }
      return prevColumns;
    });
  };

  return (
    <ColumnsContext.Provider value={{ columns, setColumns: updateColumns, addCardToColumn, moveCardToColumn }}>
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
