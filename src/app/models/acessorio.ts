export class Acessorio {

    id!: number | null; //tem que botar o NULL pq o JPA não ta mais aceitando salvar passando id como 0
    nome!: string;

    constructor(id: number | null, nome: string){
        this.id = id;
        this.nome = nome; 
    }

}
