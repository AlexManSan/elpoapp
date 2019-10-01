import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { Comorbidade } from '../model/Comorbidade.model';
import { API_CONFIG } from 'src/config/api.config';
import { TpAnestesia } from '../model/TpAnestesia.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class TpAnestesiaService extends GenericService<TpAnestesia> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/tpanestesias`, injector, Comorbidade.fromJson)
   }
}