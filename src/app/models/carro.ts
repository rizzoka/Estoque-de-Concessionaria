import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

    id!: number | null; //tem que botar o NULL pq o JPA não ta mais aceitando salvar passando id como 0
    nome!: string;
    marca!: Marca; //associação com a classe Marca, indicando que cada carro tem uma marca, e a marca é representada por um objeto do tipo Marca
    acessorios: Acessorio[] = []; //associação com a classe Acessorio, indicando que cada carro pode ter uma lista de acessórios, e os acessórios são representados por objetos do tipo Acessorio

    constructor(id?: number | null, nome?: string, marca?: Marca | null){
        // o | null é para permitir que o valor seja nulo, ou seja, que o id possa ser null, o nome possa ser null e a marca possa ser null. Isso é útil para casos em que você não tem um valor específico para essas propriedades no momento da criação do objeto, ou quando você quer criar um objeto sem fornecer esses valores inicialmente.
        if(id) this.id = id;
        if(nome) this.nome = nome;
        if(marca) this.marca = marca;

        //tem que declarar desse jeito pq o novo angular da erro de outra forma
    }

}
