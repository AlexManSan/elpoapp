import { Component, OnInit, Input } from '@angular/core';
import { RecomendacoesService } from 'src/shared/services/RecomendacoesService.service';
import { ModalController } from '@ionic/angular';
import { Elpo } from 'src/shared/model/Elpo.model';
import { Recomendacoes } from 'src/shared/model/Recomendacoes.model';

@Component({
  selector: 'app-recomendacao',
  templateUrl: './recomendacao.page.html',
  styleUrls: ['./recomendacao.page.scss'],
})
export class RecomendacaoPage implements OnInit {

  @Input() elpo: Elpo;
  lirecomendacoes: Recomendacoes[];
  id: number;

  constructor(
    private recomendacoesService: RecomendacoesService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // recebi o objeto certinho
    console.log("Elpo enviada: "+this.elpo.paciente.nome);
    console.log("Id do Tipo de posição cirúrgica enviado pela Elpo: "+this.elpo.tpPosicaoCirurgica.id);
    this.id = this.elpo.tpPosicaoCirurgica.id;
    this.getRecomendacoes(this.id);
  }

  private getRecomendacoes(id: number){
    this.recomendacoesService.getByTpPosicaoCirurgica(id).subscribe(
      registros => this.lirecomendacoes = registros,
      error => alert('Erro ao carregar lista das recomendações.')
    );
  }

  fechar() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
