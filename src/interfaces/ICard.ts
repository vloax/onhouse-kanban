import { ITag } from './ITag';

export interface ICard {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  colunaId: number;
  tags?: ITag[];
}
