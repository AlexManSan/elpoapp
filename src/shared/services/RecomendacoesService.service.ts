import { Injectable, Injector } from '@angular/core';

import { GenericService } from './GenericService.service';
import { API_CONFIG } from 'src/config/api.config';
import { Recomendacoes } from '../model/Recomendacoes.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço que se estende a BaseResourceService<Recomendacoes>, informando seu tipo
 * Autor Alex Santos
 */
export class RecomendacoesService extends GenericService<Recomendacoes> {

  constructor(protected injector: Injector) {
    super(`${API_CONFIG.baseUrl}/recomendacoes`, injector, Recomendacoes.fromJson)
   }


   getByTpPosicaoCirurgica(id: number): Observable<Recomendacoes[]> {
    const url = `${API_CONFIG.baseUrl}/recomendacoes/tpposicaocirurgica/${id}`;

    return this.http.get(url).pipe(
        map(this.jasonDataToRecursos.bind(this)),
        catchError(this.handleError)
    );
   }

}