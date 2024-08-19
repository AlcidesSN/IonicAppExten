import { Equipamento, Ficha, Pericias } from './../../model/ficha';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FichasService } from '../services/fichas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  //2 way data binding dos checkbox esta dando algum erro, quando inicia, mas funciona normalmente e se mudar não funciona
  //até saber consertar deixar deste mesmo jeito.
  pericias:Pericias = {
    acrobacia:false,
    arcanismo:false,
    atletismo:false,
    atuacao:false,
    enganacao:false,
    furtividade:false,
    hitoria:false,
    intimidacao:false,
    intuicao:false,
    investigacao:false,
    lidarComAnimais:false,
    medicina:false,
    natureza:false,
    persepcao:false,
    persuasao:false,
    prestidigitacao:false,
    religiao:false,
    sobrevivencia:false
  };
  equipamento:Equipamento[] = []

  ficha:Ficha = {
  hpAtual:0,
  hpMax:0,
  xpAtual:0,
  xpNextNivel:0,
  for:0,
  des:0,
  con:0,
  int:0,
  sab:0,
  car:0,
  pericias: this.pericias,
  equipamentos: this.equipamento
  };

  sheetForm:FormGroup = new FormGroup({});
  periciasForm:FormGroup = new FormGroup({});

  imagemPersonagem:string = "https://ionicframework.com/docs/img/demos/avatar.svg";

  constructor(
    private formBuilder: FormBuilder,
    private storageProvider:FichasService
  ) {
    this.pegarFormumario();
    this.initializePericias();
    this.initializeForm();
    this.verificarFormBranco();
    
    setInterval(() => {this.salvarForm();},1000)
  }

  setVida():number{
    return this.sheetForm.value['hpAtual'] / this.sheetForm.value['hpMax'];
  }
  setXp():number{
    return this.sheetForm.value['xpAtual'] / this.sheetForm.value['xpNextNivel'];
  }
  modAtributo(atributo:number):string{
    return (Math.round((atributo - 10)/2)).toString();
  }
  salvarForm(){
    this.storageProvider.salvarPersonagem(this.sheetForm.value, this.ficha.pericias);
  }
  pegarFormumario(){
    this.storageProvider.getAll()
    .then((ficha) => {
      this.ficha = ficha[0];
      this.pericias = ficha[0].pericias;
      this.periciasForm.value['acrobacia'] = ficha[0].pericias.acrobacia;
      this.periciasForm.value['arcanismo'] = ficha[0].pericias.arcanismo;
      this.periciasForm.value['atletismo'] = ficha[0].pericias.atletismo;
      this.periciasForm.value['atuacao'] = ficha[0].pericias.atuacao;
      this.periciasForm.value['enganacao'] = ficha[0].pericias.enganacao;
      this.periciasForm.value['furtividade'] = ficha[0].pericias.furtividade;
      this.periciasForm.value['hitoria'] = ficha[0].pericias.hitoria;
      this.periciasForm.value['intimidacao'] = ficha[0].pericias.intimidacao;
      this.periciasForm.value['intuicao'] = ficha[0].pericias.intuicao;
      this.periciasForm.value['investigacao'] = ficha[0].pericias.investigacao;
      this.periciasForm.value['lidarComAnimais'] = ficha[0].pericias.lidarComAnimais;
      this.periciasForm.value['medicina'] = ficha[0].pericias.medicina;
      this.periciasForm.value['natureza'] = ficha[0].pericias.natureza;
      this.periciasForm.value['persepcao'] = ficha[0].pericias.persepcao;
      this.periciasForm.value['persuasao'] = ficha[0].pericias.persuasao;
      this.periciasForm.value['prestidigitacao'] = ficha[0].pericias.prestidigitacao;
      this.periciasForm.value['religiao'] = ficha[0].pericias.religiao;
      this.periciasForm.value['sobrevivencia'] = ficha[0].pericias.sobrevivencia;
    })
    .catch((err) => alert(err));
  }

  verificarFormBranco(){
    if(this.ficha.xpNextNivel != 0 && this.ficha.xpAtual != 0){
      this.atualizarForm();
    }
    else{
      this.criarForm();
    }
  }
  initializePericias(){
    this.periciasForm = this.formBuilder.group({
      acrobacia:[false,[Validators.required]],
      arcanismo:[false,[Validators.required]],
      atletismo:[false,[Validators.required]],
      atuacao:[false,[Validators.required]],
      enganacao:[false,[Validators.required]],
      furtividade:[false,[Validators.required]],
      hitoria:[false,[Validators.required]],
      intimidacao:[false,[Validators.required]],
      intuicao:[false,[Validators.required]],
      investigacao:[false,[Validators.required]],
      lidarComAnimais:[false,[Validators.required]],
      medicina:[false ,[Validators.required]],
      natureza:[false,[Validators.required]],
      persepcao:[false,[Validators.required]],
      persuasao:[false,[Validators.required]],
      prestidigitacao:[false,[Validators.required]],
      religiao:[false,[Validators.required]],
      sobrevivencia:[false,[Validators.required]]
    });

  }
  initializeForm(){
    this.sheetForm = this.formBuilder.group({
      hpAtual:[10,[Validators.required]],
      hpMax:[10,[Validators.required]],
      xpAtual:[0,[Validators.required]],
      xpNextNivel:[300,[Validators.required]],
      for:[10,[Validators.required]],
      des:[10,[Validators.required]],
      con:[10,[Validators.required]],
      int:[10,[Validators.required]],
      sab:[10,[Validators.required]],
      car:[10,[Validators.required]],
      pericias:['',[Validators.required]]
    });
  }
  atualizarForm(){
    this.sheetForm.value['hpAtual'] = this.ficha.hpAtual;
    this.sheetForm.value['hpMax'] = this.ficha.hpMax;
    this.sheetForm.value['xpAtual'] = this.ficha.xpAtual;
    this.sheetForm.value['xpNextNivel'] = this.ficha.xpNextNivel;
    this.sheetForm.value['for'] = this.ficha.for;
    this.sheetForm.value['des'] = this.ficha.des;
    this.sheetForm.value['con'] = this.ficha.con;
    this.sheetForm.value['int'] = this.ficha.int;
    this.sheetForm.value['sab'] = this.ficha.sab;
    this.sheetForm.value['car'] = this.ficha.car;
    this.sheetForm.value['pericias'] = this.ficha.pericias;
  }
  criarForm(){
    this.ficha.hpAtual = this.sheetForm.value['hpAtual'];
    this.ficha.hpMax = this.sheetForm.value['hpMax'];
    this.ficha.xpAtual = this.sheetForm.value['xpAtual'];
    this.ficha.xpNextNivel = this.sheetForm.value['xpNextNivel']
    this.ficha.for = this.sheetForm.value['for'];
    this.ficha.des = this.sheetForm.value['des'];
    this.ficha.con = this.sheetForm.value['con'];
    this.ficha.int = this.sheetForm.value['int'];
    this.ficha.sab = this.sheetForm.value['sab'];
    this.ficha.car = this.sheetForm.value['car'];
    this.ficha.pericias = this.sheetForm.value['pericias'];
  }

  ngOnInit(){

  }

}
