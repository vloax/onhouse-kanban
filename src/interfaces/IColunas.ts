import ICard from './ICard';

export default interface IColunas {
  id: number;
  nome: string;
  cards: ICard[];
}
