import { ICard } from './ICard';
import IColunas from './IColunas';

export default interface ColumnsContextType {
  columns: IColunas[];
  setColumns: (columns: IColunas[]) => void;
  addCardToColumn: (columnId: number, card: ICard) => void;
  moveCardToColumn: (
    fromColumnId: number,
    toColumnId: number,
    cardId: number,
  ) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  removeColumn: (columnId: number) => void;
  removeCard: (columnId: number, cardId: number) => void;
  findOneCardById: (cardId: number) => ICard | null;
  updateCard: (cardId: number, updatedFields: Partial<ICard>) => void;
}
