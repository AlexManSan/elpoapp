import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { Comorbidade } from '../model/Comorbidade.model';
import { API_CONFIG } from 'src/config/api.config';
import { IdadePaciente } from '../model/IdadePaciente.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class IdadePacienteService extends GenericService<IdadePaciente> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/idade_pacientes`, injector, Comorbidade.fromJson)
   }
}