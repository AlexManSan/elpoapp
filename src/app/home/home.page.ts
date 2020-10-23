import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from '@ionic/angular';
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
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from 'src/shared/model/Paciente.model';
import { PacienteService } from 'src/shared/services/PacienteService.service';
import { Elpo } from 'src/shared/model/Elpo.model';
import { RecomendacaoPage } from '../recomendacao/recomendacao.page';
import { ElpoService } from 'src/shared/services/ElpoService.service';

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
  totalScore: number;
  paciente: Paciente = new Paciente();
  ultimoSlide: boolean;
  calcidade: boolean;
  elpo = new Elpo();
  idadePaciente = new IdadePaciente();

  // pra instanciar vou precisar do formBuilder
  formGroup: FormGroup;

  /**
   * @param comoService Enviando o serviço para o GenericList
   */
  constructor(
    public navCtrl: NavController,
    private tpPosCirurgicaService: TpPosCirurgicaService,
    private tpCirurgiaService: TpCirurgiaService,
    private tpAnestesiaService: TpAnestesiaService,
    private supersupService: SuperficieSuporteService,
    private posMembrosService: PosicaoMembrosService,
    private comoService: ComorbidadeService,
    private idadePacService: IdadePacienteService,
    private pacienteService: PacienteService,
    private elpoService: ElpoService,
    public formBuilder: FormBuilder, 
    public alertCtrl: AlertController,
    public modalController: ModalController,
    // public jsonDataToResourceFn: (jsonData) => Elpo
    ){ 
      this.formGroup = this.formBuilder.group({
        // aqui eu coloco todos os campor do formulário com o valor inicial + validator
        // ou seja eu repito as validações que eu coloquei no domain
        id: [''],
        nome: ['', [Validators.required]],
        idade: ['',[Validators.required]],
        prontuario: ['',[Validators.required]],
        // paciente: ['', [Validators.required]],  //não serve pra objeto tem que ser manual mesmo item a item
        tpPosCirurgica: ['', [Validators.required]],
        tpCirurgia: ['', [Validators.required]],
        tpAnestesia: ['', [Validators.required]],
        supSuporte: ['', [Validators.required]],
        posMembros: ['', [Validators.required]],
        comorbidade: ['', [Validators.required]]
      });
  }

  ngOnInit() {
    // this.buildResourceForm();
    this.getTipoPosCirurgica();
    this.getTipoCirurgia();
    this.getTipoAnestesia();
    this.getSuperficieSuporte();
    this.getPosicaoMembros();
    this.getComoridades();
    this.getIdadePacientes();
    this.totalScore = 0;
    this.calcidade = false;
    this.ultimoSlide = false;
    this.paciente.nome = '';
    this.paciente.idade = null;
    this.paciente.prontuario = null;
    // console.log(this.idadePaciente);
    this.elpo.data = Date.now();
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  public avancar(slides){
    // console.log(slides)
    // console.log(this.paciente);
    
    if(this.paciente.nome !== '' && this.paciente.idade !== null){
      // console.log("informou o nome, a idade e o prontuário.");
      this.elpo.paciente = this.paciente;
      slides.slideNext();
    }else{
      // console.log("não informou os campos obrigatórios.");
      this.exibeAlert();
    }
    
    slides.isEnd().then(res => {
      // console.log("resposta da promisse do isEnd() "+ res);
      if(res === true){
        console.log("Estou no último slide");
        this.ultimoSlide = true;
        if(this.calcidade === false){
          this.calcScoreIdade();
          this.elpo.totalScore = this.totalScore;
          // console.log(this.elpo);
          
          // let elpo2: Elpo = this.jsonDataToResourceFn(this.elpo);
          // this.elpoService.create(elpo2).subscribe(
          //   reg => this.elpo = reg,
          //   error => alert('Não foi possível registrar a Elpo.')
          // );

        }
      }
    });
  }

  public voltar(slides){
    // console.log(slides)
    if(this.ultimoSlide === true){
      this.ultimoSlide = false;
    }
    slides.slidePrev();
  }

  public recomecar(slides){
    this.ngOnInit();
    slides.slideTo(0);
    console.log("Recomeçando");
  }

  public calcScoreIdade(){
    // console.log("Idade:" + this.paciente.idade);
    this.calcidade = true;
    if(this.paciente.idade >=18 && this.paciente.idade <= 39){
      this.idadePaciente.id = 1;
      this.idadePaciente.idade = "Entre 18 e 39 anos";
      this.idadePaciente.score = 1;
      this.elpo.idadePaciente = this.idadePaciente;
      this.totalScore += 1;
    }
    if(this.paciente.idade >=40 && this.paciente.idade <= 59){
      this.idadePaciente.id = 2;
      this.idadePaciente.idade = "Entre 40 e 59 anos";
      this.idadePaciente.score = 2;
      this.elpo.idadePaciente = this.idadePaciente;
      this.totalScore += 2;
    }
    if(this.paciente.idade >=60 && this.paciente.idade <= 69){
      this.idadePaciente.id = 3;
      this.idadePaciente.idade = "Entre 60 e 69 anos";
      this.idadePaciente.score = 3;
      this.elpo.idadePaciente = this.idadePaciente;
      this.totalScore += 3;
    }
    if(this.paciente.idade >=70 && this.paciente.idade <= 79){
      this.idadePaciente.id = 4;
      this.idadePaciente.idade = "Entre 70 e 79 anos";
      this.idadePaciente.score = 4;
      this.elpo.idadePaciente = this.idadePaciente;
      this.totalScore += 4;
    }
    if(this.paciente.idade >=80){
      this.idadePaciente.id = 5;
      this.idadePaciente.idade = "> 80 anos";
      this.idadePaciente.score = 5;
      this.elpo.idadePaciente = this.idadePaciente;
      this.totalScore += 5;
    }
    this.identificaRisco();
  }

  /**
   * Calcula o score de acordo com o tipo de posição cirurgica selecionado
   * @param tpPosCirurgica 
   * @param event 
   */
  public identificaTpPosCirurgica(tpPosCirurgica, event){
    // console.log(event);
    if(event.target.checked === true){
      this.elpo.tpPosicaoCirurgica = null;
      this.totalScore -= tpPosCirurgica.score;
      // alert("Removeu "+tpPosCirurgica.descricao+" Score: "+tpPosCirurgica.score+" Total de Score: "+this.totalScore);
    }
    if(event.target.checked === false){
      this.elpo.tpPosicaoCirurgica = tpPosCirurgica;
      this.totalScore += tpPosCirurgica.score;
      // alert("Clicou "+tpPosCirurgica.descricao+" Score: "+tpPosCirurgica.score+" Total de Score: "+this.totalScore);
    }
  }

  /**
   * Calcula o score de acordo com o tipo de cirurgia selecionada
   * @param tpCirurgia 
   * @param event 
   */
  public identificaTpCirurgia(tpCirurgia, event){
    if(event.target.checked === true){
      this.elpo.tpCirurgia = null;
      this.totalScore -= tpCirurgia.score;
    }
    if(event.target.checked === false){
      this.elpo.tpCirurgia = tpCirurgia;
      this.totalScore += tpCirurgia.score;
    }
  }

  /**
   * Calcula o score de acordo com o tipo de Anestesia selecionada
   * @param tpAnestesia 
   * @param event 
   */
  public identificaTpAnestesia(tpAnestesia, event){
    if(event.target.checked === true){
      this.elpo.tpAnestesia = null;
      this.totalScore -= tpAnestesia.score;
    }
    if(event.target.checked === false){
      this.elpo.tpAnestesia = tpAnestesia;
      this.totalScore += tpAnestesia.score;
    }
  }

  /**
   * Calcula o score de acordo com a Superfície de Suporte selecionada
   * @param supSuporte 
   * @param event 
   */
  public identificaSupSuporte(supSuporte, event){
    if(event.target.checked === true){
      this.elpo.superficieSuporte = null;
      this.totalScore -= supSuporte.score;
    }
    if(event.target.checked === false){
      this.elpo.superficieSuporte = supSuporte;
      this.totalScore += supSuporte.score;
    }
  }

  /**
   * Calcula o score de acordo com a Posição dos Membros selecionada
   * @param posMembros 
   * @param event 
   */
  public identificaPosMembros(posMembros, event){
    if(event.target.checked === true){
      this.elpo.posicaoMembros = null;
      this.totalScore -= posMembros.score;
    }
    if(event.target.checked === false){
      this.elpo.posicaoMembros = posMembros;
      this.totalScore += posMembros.score;
    }
  }

  /**
   * Calcula o score de acordo com a Comorbidade selecionada
   * @param comorbidade 
   * @param event 
   */
  public identificaComorbidades(comorbidade, event){
    if(event.target.checked === true){
      this.elpo.comorbidade = null;
      this.totalScore -= comorbidade.score;
    }
    if(event.target.checked === false){
      this.elpo.comorbidade = comorbidade;
      this.totalScore += comorbidade.score;
    }
  }

  private identificaRisco(){
    if(this.totalScore <= 19){
      this.elpo.risco = "Baixo";
    }else{
      this.elpo.risco = "Alto";
    }
  }

  private getTipoPosCirurgica(){
    // console.log("Pegando tipo de posição cirúrgica");
    this.tpPosCirurgicaService.getAll().subscribe(
      registros => this.litpPosCirurgica = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de posição cirúrgica.')
    );
  }
  
  private getTipoCirurgia(){
    // console.log("Pegando tipo de cirúrgia");
    this.tpCirurgiaService.getAll().subscribe(
      registros => this.litpCirurgia = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de cirurgia.')
    );
  }

  private getTipoAnestesia(){
    // console.log("Pegando tipo de anestesia");
    this.tpAnestesiaService.getAll().subscribe(
      registros => this.litpAnestesia = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista dos tipos de anestesia.')
    );
  }

  private getSuperficieSuporte(){
    // console.log("Pegando superficie de suporte");
    this.supersupService.getAll().subscribe(
      registros => this.lisupSuporte = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista das superfícies de suporte.')
    );
  }

  private getPosicaoMembros(){
    // console.log("Pegando posicao dos membros");
    this.posMembrosService.getAll().subscribe(
      registros => this.liposMembros = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista das posições dos membros.')
    );
  }

  private getComoridades(){
    // console.log("Pegando comorbidade");
    this.comoService.getAll().subscribe(
      registros => this.licomorbidade = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista de Comorbidades')
    );
  }

  private getIdadePacientes(){
    // console.log("Pegando idade pacientes");
    this.idadePacService.getAll().subscribe(
      registros => this.liidadePaciente = registros.sort((a,b) => a.id - b.id),
      error => alert('Erro ao carregar lista de idade dos pacientes')
    );
  }


  async exibeAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      subHeader: 'Campos obrigatórios',
      message: 'Preencha os campos obrigatórios',
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * eu iria usar o modal mais infelizmente o modal não ficou com barra de rolagem
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: RecomendacaoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'elpo': this.elpo,
      }
    });
    return await modal.present();
  }

}
