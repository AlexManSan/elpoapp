import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { Comorbidade } from '../model/Comorbidade.model';
import { API_CONFIG } from 'src/config/api.config';
import { SuperficieSuporte } from '../model/SuperficieSuporte.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class SuperficieSuporteService extends GenericService<SuperficieSuporte> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/ssuportes`, injector, SuperficieSuporte.fromJson)
   }
}