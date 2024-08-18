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
  salvarPersonagem(personagem:Ficha){
    this.getAll()
    .then((ficha) => this.equipamento = ficha[0].equipamentos)
    .catch((err) => alert(err));
    personagem.equipamentos = this.equipamento;
    this.salvarOnBD(personagem);
  }
  salvarEquipamento(Equipamento:Equipamento[]){
    this.getAll()
    .then((ficha) => this.personagem = ficha[0])
    .catch((err) => alert(err));
    this.personagem.equipamentos = Equipamento;
    this.salvarOnBD(this.personagem);
  }
  salvarOnBD(personagem:Ficha){
    this.set('ficha01', personagem);
  }

}

