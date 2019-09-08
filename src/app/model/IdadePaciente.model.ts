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
}