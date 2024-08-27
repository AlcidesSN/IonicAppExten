import { Component, OnInit } from '@angular/core';
import { Camera ,CameraResultType ,CameraSource, Photo } from '@Capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

const IMGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage implements OnInit {
  image: LocalFile[] = [];

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.loadFiles();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.image[0].data, 'confirm');
  }

  async loadFiles(){
    this.image = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMGE_DIR
    }).then(result => {
      console.log('Here: ' , result.files[0]);
      this.loadFileData(result.files[0].name);

    },async err=> {
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMGE_DIR
      });
    }).then(_ => {
      loading.dismiss();
    })
  }

  async loadFileData(fileName:string){
    const filePath = `${IMGE_DIR}/${fileName}`;

    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path:filePath
    });
    this.image.push({
      name: fileName,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`
    })
  }

  async selectImages(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image);

    if(image){
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo){
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);

    const fileName = 'personagem.jpg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMGE_DIR}/${fileName}`,
      data: base64Data
    });
    console.log('Salvo', savedFile);
    this.loadFiles();
  }

  async readAsBase64(photo:Photo){
    if(this.platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path: this.exist(photo.path)
      });
      return file.data;
    }
    else{
      const response = await fetch(this.exist(photo.webPath));
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  convertBlobToBase64 = (blob:Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  exist(item:any){
    if(item == undefined)
      return '';
    else
      return item;
  }

}
