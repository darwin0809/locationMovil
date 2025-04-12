import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import {
  IonItem,
  IonLabel, 
  //IonTitle, 
  IonButton, 
  IonToolbar,
  IonButtons,
  IonImg,
  IonList,
  IonContent,
  IonTitle,
  IonHeader} from '@ionic/angular/standalone';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
    imports: [ 
      IonItem, 
      IonToolbar,  
      IonImg,
      IonList,
      IonButton,
      IonContent,
      IonTitle,
      IonHeader
    ],
})
export class HomeDeferPage {
  photos: string[] = [];

  constructor() {}

  async takePhoto() {
    if (!Capacitor.isNativePlatform()) {
      // Si estás en el navegador, usa una imagen de prueba
      this.photos.unshift('https://via.placeholder.com/150');
      return;
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photos.unshift(image.dataUrl!);
  }
}
