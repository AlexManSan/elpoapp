import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { API_CONFIG } from 'src/config/api.config';
import { Paciente } from '../model/Paciente.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class PacienteService extends GenericService<Paciente> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/pacientes`, injector, Paciente.fromJson)
   }
}