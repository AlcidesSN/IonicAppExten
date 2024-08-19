import { Equipamento } from './../../model/ficha';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Ficha, Pericias } from 'src/model/ficha';

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  constructor(public storage: Storage) {
    this.storage.create();
   }
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

   personagem:Ficha = {
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

  getAll():Promise<Ficha[]>{
    let fichas:Ficha[] = [];

    return this.storage.forEach(function(ficha,key, i){
      fichas.push(ficha);
    }).then(() => Promise.resolve(fichas))
      .catch(() => Promise.reject('Erro ao recuperara os dados!'));
  }
  set(key:string,value:Ficha|undefined){
    this.storage.set(key,value);
  }

  get(key:string){
    return this.storage.get(key);
  }
  salvarPersonagem(personagem:Ficha, pericias:Pericias){
    this.getAll()
    .then((ficha) => {
      if(ficha[0]== undefined){
        console.log(this.personagem)
        this.salvarOnBD(this.personagem);
        return;
      }
      this.personagem = personagem;
      this.personagem.pericias = pericias;
      this.personagem.equipamentos = ficha[0].equipamentos;

      this.salvarOnBD(this.personagem);
    })
    //.catch((err) => alert(err));
  }
  salvarEquipamento(Equipamentos:Equipamento[]){
    this.getAll()
    .then((ficha) => {
      ficha[0].equipamentos = Equipamentos;
      this.salvarOnBD(ficha[0]);
    })
    .catch((err) => alert(err));

  }
  salvarOnBD(personagem:Ficha){
    console.log(personagem.equipamentos)
    this.set('ficha01', personagem);
  }

}

