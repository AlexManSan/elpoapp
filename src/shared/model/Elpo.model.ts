import { GenericDomain } from './GenericDomain.model';
import { Paciente } from './Paciente.model';
import { TpPosicaoCirurgica } from './TpPosicaoCirurgica.model';
import { SuperficieSuporte } from './SuperficieSuporte.model';
import { TpCirurgia } from './TpCirurgia.model';
import { PosicaoMembros } from './PosicaoMembros.model';
import { TpAnestesia } from './TpAnestesia.model';
import { IdadePaciente } from './IdadePaciente.model';
import { Comorbidade } from './Comorbidade.model';

/**
 * Atenção tem que ter os mesmos atributos que no backend
 * ? significa que é um atributo opcional
 */
export class Elpo extends GenericDomain{
    constructor(
        id?: string,
        public data?: number,
        public totalScore?: number,
        public risco?: string,
        public paciente?: Paciente,
        public tpPosicaoCirurgica?: TpPosicaoCirurgica,
        public superficieSuporte?: SuperficieSuporte,
        public tpCirurgia?: TpCirurgia,
        public posicaoMembros?: PosicaoMembros,
        public tpAnestesia?: TpAnestesia,
        public idadePaciente?: IdadePaciente,
        public comorbidade?: Comorbidade,
    ) { super(); }

    // metodo recebe um json e retorna uma nova instância da classe entry com os dados do json
    static fromJson(jsonData: any): Elpo {
        return Object.assign(new Elpo(), jsonData);
    }
}