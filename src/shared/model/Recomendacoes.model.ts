import { GenericDomain } from './GenericDomain.model';
import { TpPosicaoCirurgica } from './TpPosicaoCirurgica.model';

/**
 * Atenção tem que ter os mesmos atributos que no backend
 * ? significa que é um atributo opcional
 */
export class Recomendacoes extends GenericDomain{
    constructor(
        id?: string,
        public regiaoCorpo?: string,
        public recomendacoes?: string,
        public tpPosicaoCirurgica?: TpPosicaoCirurgica
    ) { super(); }

    // metodo recebe um json e retorna uma nova instância da classe entry com os dados do json
    static fromJson(jsonData: any): Recomendacoes {
        return Object.assign(new Recomendacoes(), jsonData);
    }
}