import { Equipamento, Ficha, Habilidades, Magias, Pericias } from './../../model/ficha';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FichasService } from '../services/fichas.service';
import { ModalController } from '@ionic/angular';
import { ImageUploadPage } from '../Modal/image-upload/image-upload.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  img:string = '';

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
  magias:Magias[] = [];
  equipamento:Equipamento[] = [];
  habilidades:Habilidades[] = [];
  

  ficha:Ficha = {
  hpAtual:10,
  hpMax:10,
  xpAtual:0,
  xpNextNivel:300,
  imagemPersonagem: "https://ionicframework.com/docs/img/demos/avatar.svg",
  for:10,
  des:10,
  con:10,
  int:10,
  sab:10,
  car:10,
  pericias: this.pericias,
  equipamentos: this.equipamento,
  habilidades: this.habilidades,
  magias: this.magias
  };

  sheetForm:FormGroup = new FormGroup({});
  periciasForm:FormGroup = new FormGroup({});


  constructor(
    private formBuilder: FormBuilder,
    private storageProvider:FichasService,
    private modalCtrl: ModalController
  ) {
    this.initializePericias();
    this.initializeForm();
    this.pegarFormumario();
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
    this.storageProvider.salvarPersonagem(this.sheetForm.value,this.ficha.pericias );
  }
  pegarFormumario(){
    this.storageProvider.getAll()
    .then((ficha) => {
      if(ficha[0]== undefined){
        this.sheetForm.value['pericias'] = this.periciasForm.value;
        this.storageProvider.salvarPersonagem(this.sheetForm.value, this.sheetForm.value['pericias']);
        return;
      }
      this.ficha = ficha[0];
      this.ficha.pericias = ficha[0].pericias;
      this.ficha.imagemPersonagem = ficha[0].imagemPersonagem;
      this.sheetForm.value['imagemPersonagem'] = ficha[0].imagemPersonagem;
      console.log(this.sheetForm.value)
    })
    console.log(this.sheetForm.value)

  }

  async mudarImagem(){
    const modal = await this.modalCtrl.create({
      component: ImageUploadPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(role == 'cancel')
      return;
    this.ficha.imagemPersonagem = data;
    this.sheetForm.value['imagemPersonagem'] = data;
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
      imagemPersonagem: ["https://ionicframework.com/docs/img/demos/avatar.svg",[Validators.required]],
      for:[10,[Validators.required]],
      des:[10,[Validators.required]],
      con:[10,[Validators.required]],
      int:[10,[Validators.required]],
      sab:[10,[Validators.required]],
      car:[10,[Validators.required]],
      pericias:['',[Validators.required]],
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
