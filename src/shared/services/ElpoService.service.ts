import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { Comorbidade } from '../model/Comorbidade.model';
import { API_CONFIG } from 'src/config/api.config';
import { Elpo } from '../model/Elpo.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Categoria>, informando seu tipo
 * Autor Alex Santos
 */
export class ElpoService extends GenericService<Elpo> {

  constructor(protected injector: Injector) {
    super("http://localhost:8080/elpos", injector, Elpo.fromJson)
   }
}