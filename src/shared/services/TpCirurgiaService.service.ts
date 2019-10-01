import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { Comorbidade } from '../model/Comorbidade.model';
import { API_CONFIG } from 'src/config/api.config';
import { TpCirurgia } from '../model/TpCirurgia.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class TpCirurgiaService extends GenericService<TpCirurgia> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/tpcirurgias`, injector, Comorbidade.fromJson)
   }
}