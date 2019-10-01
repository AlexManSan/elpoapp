import { OnInit } from '@angular/core';
import { GenericDomain } from 'src/shared/model/GenericDomain.model';
import { GenericService } from 'src/shared/services/GenericService.service';


export abstract class GenericList<T extends GenericDomain> implements OnInit {

  resources: T[] = [];

  constructor(private resourceservice: GenericService<T>) { }

  ngOnInit() {
    this.resourceservice.getAll().subscribe(
        resources => this.resources = resources.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar Lista')
    );
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceservice.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(elemento => elemento !== resource),
        () => alert('Erro ao tentar Excluir.')
      );
    }
  }

}