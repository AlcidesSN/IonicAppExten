import { Ficha, Pericias } from './../../model/ficha';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FichasService } from '../services/fichas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

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
    }
  personagem:Ficha|undefined;
  ficha:Ficha = {
    hpAtual:10,
    hpMax:10,
    xpAtual:10,
    xpNextNivel:10,
    for:10,
    des:10,
    con:10,
    int:10,
    sab:10,
    car:10,
    pericias: this.pericias
  };



  sheetForm:FormGroup = new FormGroup({});
  periciasForm:FormGroup = new FormGroup({});

  imagemPersonagem:string = "https://ionicframework.com/docs/img/demos/avatar.svg";

  constructor(
    private formBuilder: FormBuilder,
    private storageProvider:FichasService
  ) {
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
      hpAtual:[50,[Validators.required]],
      hpMax:[100,[Validators.required]],
      xpAtual:[50,[Validators.required]],
      xpNextNivel:[300,[Validators.required]],
      for:[10,[Validators.required]],
      des:[10,[Validators.required]],
      con:[10,[Validators.required]],
      int:[20,[Validators.required]],
      sab:[10,[Validators.required]],
      car:[10,[Validators.required]],
      pericias:['',[Validators.required]]
    });
  }
  setVida():number{
    return this.sheetForm.value['hpAtual'] / this.sheetForm.value['hpMax'];
  }
  setXp():number{
    return this.sheetForm.value['xpAtual'] / this.sheetForm.value['xpNextNivel'];
  }

  modAtributo(atributo:number):string{
    return (Math.round((atributo - 10)/2)).toString()
  }
  autualizarForm(){
    this.sheetForm.value['pericias'] = this.periciasForm.value;
    this.personagem = this.sheetForm.value;
    this.storageProvider.set('ficha01', this.personagem);
  }

  ngOnInit(){

    this.storageProvider.getAll()
                                 .then((ficha) => this.ficha = ficha[0])
                                 .catch((err) => alert(err));
    this.initializePericias();
    this.initializeForm();
    //this.autualizarForm();
  }

}
