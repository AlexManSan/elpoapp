import { Component, OnInit } from '@angular/core';
import { Comorbidade } from 'src/shared/model/Comorbidade.model';
import { ComorbidadeService } from 'src/shared/services/ComorbidadeService.service';
import { GenericDomain } from 'src/shared/model/GenericDomain.model';
import { TpPosCirurgicaService } from 'src/shared/services/TpPosCirurgicaService.service';
import { TpPosicaoCirurgica } from 'src/shared/model/TpPosicaoCirurgica.model';
import { TpCirurgia } from 'src/shared/model/TpCirurgia.model';
import { TpAnestesia } from 'src/shared/model/TpAnestesia.model';
import { SuperficieSuporte } from 'src/shared/model/SuperficieSuporte.model';
import { PosicaoMembros } from 'src/shared/model/PosicaoMembros.model';
import { IdadePaciente } from 'src/shared/model/IdadePaciente.model';
import { TpCirurgiaService } from 'src/shared/services/TpCirurgiaService.service';
import { TpAnestesiaService } from 'src/shared/services/TpAnestesiaService.service';
import { IdadePacienteService } from 'src/shared/services/IdadePacienteService.service';
import { PosicaoMembrosService } from 'src/shared/services/PosicaoMembrosService.service';
import { SuperficieSuporteService } from 'src/shared/services/SuperficeiSuporteService.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage<T extends GenericDomain> implements OnInit {

  litpPosCirurgica: TpPosicaoCirurgica[];
  litpCirurgia: TpCirurgia[];
  litpAnestesia: TpAnestesia[];
  lisupSuporte: SuperficieSuporte[];
  liposMembros: PosicaoMembros[];
  licomorbidade: Comorbidade[]; 
  liidadePaciente: IdadePaciente[];

  formGroup: FormGroup;

  /**
   * @param comoService Enviando o serviço para o GenericList
   */
  constructor(
    private tpPosCirurgicaService: TpPosCirurgicaService,
    private tpCirurgiaService: TpCirurgiaService,
    private tpAnestesiaService: TpAnestesiaService,
    private supersupService: SuperficieSuporteService,
    private posMembrosService: PosicaoMembrosService,
    private comoService: ComorbidadeService,
    private idadePacService: IdadePacienteService,
    public formBuilder: FormBuilder
    ){ 
  }

  ngOnInit() {
    this.getTipoPosCirurgica();
    this.getTipoCirurgia();
    this.getTipoAnestesia();
    this.getSuperficieSuporte();
    this.getPosicaoMembros();
    this.getComoridades();
    this.getIdadePacientes();
  }

  private getTipoPosCirurgica(){
    this.tpPosCirurgicaService.getAll().subscribe(
      registros => this.litpPosCirurgica = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de posição cirúrgica.')
    );
  }
  
  private getTipoCirurgia(){
    this.tpCirurgiaService.getAll().subscribe(
      registros => this.litpCirurgia = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de cirurgia.')
    );
  }

  private getTipoAnestesia(){
    this.tpAnestesiaService.getAll().subscribe(
      registros => this.litpAnestesia = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de anestesia.')
    );
  }

  private getSuperficieSuporte(){
    this.supersupService.getAll().subscribe(
      registros => this.lisupSuporte = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista das superfícies de suporte.')
    );
  }

  private getPosicaoMembros(){
    this.posMembrosService.getAll().subscribe(
      registros => this.liposMembros = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista das posições dos membros.')
    );
  }

  private getComoridades(){
    this.comoService.getAll().subscribe(
      registros => this.licomorbidade = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista de Comorbidades')
    );
  }

  private getIdadePacientes(){
    this.idadePacService.getAll().subscribe(
      registros => this.liidadePaciente = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista de idade dos pacientes')
    );
  }

  /**
   * Teste de customização do ion-select
   */
  customAlertOptions: any = {
    header: 'TEste de Customização',
    subHeader: 'subtítulo',
    message: 'mensagem',
    translucent: true
  };

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  
  customActionSheetOptions: any = {
    header: 'header',
    subHeader: 'Selecione um item'
  };
 

}
