export interface ITag {
  text: string;
  color: string;
}

export interface ICard {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  colunaId: number;
  tags?: ITag[];
}
