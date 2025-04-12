import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation'; // <-- Importante

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/leaflet/images/marker-icon-2x.png',
  iconUrl: '/assets/leaflet/images/marker-icon.png',
  shadowUrl: '/assets/leaflet/images/marker-shadow.png',
});

@Component({
  selector: 'app-ubi',
  templateUrl: './ubi.page.html',
  styleUrls: ['./ubi.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonContent,
    IonHeader
  ]
})
export class UbiPage implements OnInit {
  private map!: L.Map;

  constructor() {}

  // 👇 Aquí integras
  async ngOnInit() {
    await this.requestPermissions();
    this.initMap();
  }

  // 👇 Solicitud de permisos
  async requestPermissions() {
    const permissions = await Geolocation.requestPermissions();
    console.log('Permissions:', permissions);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.getCurrentLocation();
  }

  private getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = [position.coords.latitude, position.coords.longitude] as [number, number];
        this.map.setView(coords, 15);
        L.marker(coords).addTo(this.map)
          .bindPopup('Estás aquí.')
          .openPopup();
      }, error => {
        console.error(error);
      });
    }
  }
}
