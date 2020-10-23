import { GenericDomain } from './GenericDomain.model';

/**
 * Atenção tem que ter os mesmos atributos que no backend
 * ? significa que é um atributo opcional
 */
export class Paciente extends GenericDomain{
    constructor(
        id?: string,
        public nome?: string,
        public idade?: number,
        public prontuario?: number
    ) { super(); }

    // metodo recebe um json e retorna uma nova instância da classe entry com os dados do json
    static fromJson(jsonData: any): Paciente {
        return Object.assign(new Paciente(), jsonData);
    }
}