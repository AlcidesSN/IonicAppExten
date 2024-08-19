import { AlertController, ModalController } from '@ionic/angular';
import { CriarEquipamentoPage } from '../Modal/criar-equipamento/criar-equipamento.page';
import { Equipamento } from './../../model/ficha';
import { Component, OnInit } from '@angular/core';
import { FichasService } from '../services/fichas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(
    private modalCtrl:ModalController,
    private alertController:AlertController,
    private storageProvider:FichasService) {}

  ngOnInit(): void {
    this.pegarEquipamentos();
  }
  pegarEquipamentos(){
    this.storageProvider.getAll()
    .then((ficha) => this.equipamento = ficha[0].equipamentos)
    .catch((err) => alert(err));
  }

  equipamento:Equipamento[] = [];



   async openCriarEquipamento(){
    const modal = await this.modalCtrl.create({
      component: CriarEquipamentoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(role == 'cancel')
      return;
    this.equipamento.push(data);
    this.storageProvider.salvarEquipamento(this.equipamento)
   }
   async apagarItem(i:number){
    const alert = await this.alertController.create({
      header: 'Excluir Equipamento',
      message: 'Deseja mesmo excluir o equipamento',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.equipamento.splice(i,1);
            this.storageProvider.salvarEquipamento(this.equipamento);
          }
        }
      ],
      });
      
      await alert.present();
   }


}
