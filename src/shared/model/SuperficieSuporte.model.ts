import { GenericDomain } from './GenericDomain.model';

/**
 * Atenção tem que ter os mesmos atributos que no backend
 * ? significa que é um atributo opcional
 */
export class SuperficieSuporte extends GenericDomain{
    constructor(
        id?: string,
        public descricao?: string,
        public score?: number
    ) { super(); }

    // metodo recebe um json e retorna uma nova instância da classe entry com os dados do json
    static fromJson(jsonData: any): SuperficieSuporte {
        return Object.assign(new SuperficieSuporte(), jsonData);
    }
}