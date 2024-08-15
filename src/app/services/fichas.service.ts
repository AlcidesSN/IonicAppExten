import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Ficha } from 'src/model/ficha';

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  constructor(public storage: Storage) {
    this.storage.create();
   }


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

}

