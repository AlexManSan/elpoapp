import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenericDomain } from '../model/GenericDomain.model';

/**
 * Classe Genérica BaseResourceService<T extends BaseResourceModel>
 * que se estende a classe BaseResourceModel por conta do id de busca 
 * e caso necessario criar outros atributos que poderão ser utilizados.
 * Autor: Alex Santos 
 */
export abstract class GenericService<T extends GenericDomain> {

    protected http: HttpClient;

    /**
     * Método Construtor da classe genérica:
     * espera receber:
     * 1) a url da api, 
     * 2) um injetor para capturar assinaturas dos serviços filhos,
     * 3) uma função do model que transforma jsonData para o recurso.
     * Autor Alex Santos 
     * @param apiUrl
     * @param injector 
     * @param jsonDataToResourceFn 
     */
    constructor(
        protected apiUrl: string, 
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ){ 
        this.http = injector.get(HttpClient);
        // como pegar outras clases pede pro injetor
        // this.nomeDoOutroObejeto = injector.get(ClassObjeto);
        // console.log(this);
    }

    /**
     * Método público Genérico getAll()
     * Nétodo que carrega uma lista de todos os itens de um obejto
     * Autor: Alex Santos 
     */
    getAll(): Observable<T[]> {
        return this.http.get(this.apiUrl).pipe(
            map(this.jasonDataToRecursos.bind(this)),
            catchError(this.handleError)
        );
    }

    /**
     * Método público Genérico getById(id: number)
     * Método que captura um objeto pelo id
     * Autor: Alex Santos
     * @param id 
     */
    getById(id: number): Observable<T> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.get(url).pipe(
            map(this.jasonDataToRecurso.bind(this)),
            catchError(this.handleError)
        );
    }

    /**
     * Método público Genérico create(recurso: T)
     * Metodo de criação de um determinado objeto
     * Este Recurso .bind(this) determina para a função de qual objeto é
     * Autor: Alex Santos
     * @param recurso 
     */
    create(recurso: T): Observable<T> {
        return this.http.post(this.apiUrl, recurso).pipe(
            map(this.jasonDataToRecurso.bind(this)),
            catchError(this.handleError)
        );
    }

    // se estiver recebendo um jsondata tem que alterar tambem neste caso aqui não recebemos
    /**
     * Método público Genérico update(recurso: T)
     * Método que atualiza um determinado objeto
     * Autor: Alex Santos
     */
    update(recurso: T): Observable<T> {
        const url = `${this.apiUrl}/${recurso.id}`;

        return this.http.put(url, recurso).pipe(
            map(() => recurso),
            catchError(this.handleError)
        );
    }

    /**
     * Método público Genérico delete(id: number)
     * Método que deleta um determinado Objeto.
     * Autor: Alex Santos
     * @param id 
     */
    delete(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        );
    }

    // MÉTODOS PROTEGIDOS podem ser acessados pelos filhos 

    /**
     * Método protegido Genérico jasonDataToRecursos(jsonData)
     * Este metodo recebe uma lista de jsonData e transforma numa lista de objeto do recurso
     * Autor: Alex Santos
     * @param jsonData 
     */
    protected jasonDataToRecursos(jsonData: any[]): T[] {
        const recursos: T[] = [];
        jsonData.forEach(elemento => recursos.push(this.jsonDataToResourceFn(elemento)));
        return recursos;
    }

    /**
     * Método protegido Genérico jasonDataToRecurso(jsonData)
     * Este metodo recebe um jsonData e transforma num objeto do recurso
     * Autor: Alex Santos
     * @param jsonData 
     */
    protected jasonDataToRecurso(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    /**
     * Método protegido Genérico handleError(error: any)
     * Dispara o erro da aplicação
     * @param error 
     */
    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO =>', error);
        return throwError(error);
    }
}