import { GenericDomain } from './GenericDomain.model';

/**
 * Atenção tem que ter os mesmos atributos que no backend
 * ? significa que é um atributo opcional
 */
export class IdadePaciente extends GenericDomain{
    constructor(
        id?: string,
        public idade?: string,
        public score?: number
    ) { super(); }

    // metodo recebe um json e retorna uma nova instância da classe entry com os dados do json
    static fromJson(jsonData: any): IdadePaciente {
        return Object.assign(new IdadePaciente(), jsonData);
    }
}