import { Editora } from "./Editora";

export class Livro {
  id!: number;
  titulo!: string;
  editora?: Editora;
}
