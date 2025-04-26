import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

declare var mapboxgl: any;

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
    IonHeader,
    IonButton
  ]
})
export class UbiPage implements OnInit {
  currentMapType: 'leaflet' | 'mapbox' = 'leaflet';
  leafletMap: L.Map | undefined;
  mapboxMap: any | undefined;

  constructor(private platform: Platform) {}

  async ngOnInit() {
    await this.requestPermissions();
    this.initLeafletMap();
  }

  async requestPermissions() {
    // Asegúrate de que la geolocalización esté disponible en el dispositivo
    if (this.platform.is('ios') || this.platform.is('android')) {
      await Geolocation.requestPermissions();
    } else {
      console.log('Geolocalización web habilitada');
    }
  }

  // 🗺️ Inicializa Leaflet
  private initLeafletMap(): void {
    this.clearMap();

    this.leafletMap = L.map('map', {
      center: [0, 0],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.leafletMap);

    this.getCurrentLocationLeaflet();
  }

  // 🗺️ Inicializa Mapbox
  private initMapboxMap(): void {
    this.clearMap();

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyd2luY3Jpb2xsbyIsImEiOiJjbTl4dHU5cHcwcno1MmpxNXlpZjF3Y2c4In0.bkH4f0rd8iqPwRCQQDJcnQ';

    this.mapboxMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 13
    });

    navigator.geolocation.getCurrentPosition(position => {
      const coords = [position.coords.longitude, position.coords.latitude];
      this.mapboxMap.setCenter(coords);
      new mapboxgl.Marker().setLngLat(coords).addTo(this.mapboxMap);
    });
  }

  // 🔁 Cambiar tipo de mapa
  switchMap(): void {
    // Primero limpia el mapa antes de cambiar
    this.clearMap();

    if (this.currentMapType === 'leaflet') {
      this.currentMapType = 'mapbox';
      this.initMapboxMap();
    } else {
      this.currentMapType = 'leaflet';
      this.initLeafletMap();
    }
  }

  // 📍 Leaflet ubicación
  private getCurrentLocationLeaflet(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = [position.coords.latitude, position.coords.longitude] as [number, number];
      this.leafletMap?.setView(coords, 15);
      L.marker(coords).addTo(this.leafletMap!)
        .bindPopup('Estás aquí.')
        .openPopup();
    });
  }

  // 🧹 Limpia el contenedor del mapa
  private clearMap(): void {
    const container = document.getElementById('map');
    if (!container) return;

    // Limpia el contenedor y elimina cualquier instancia de mapa anterior
    console.log('Limpiando el contenedor del mapa...');
    container.innerHTML = '';

    if (this.leafletMap) {
      console.log('Eliminando mapa de Leaflet...');
      this.leafletMap.remove();
      this.leafletMap = undefined;  // Asegúrate de reiniciar la referencia
    }

    if (this.mapboxMap) {
      console.log('Eliminando mapa de Mapbox...');
      this.mapboxMap.remove();
      this.mapboxMap = undefined;  // Asegúrate de reiniciar la referencia
    }
  }
}
