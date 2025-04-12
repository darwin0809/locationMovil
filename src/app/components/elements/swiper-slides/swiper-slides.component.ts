import { Component, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { IonButton, IonButtons, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper } from 'swiper/types';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import SwiperCore from 'swiper';
// Instalar los módulos necesarios de Swiper
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);

@Component({
  selector: 'app-swiper-slides',
  templateUrl: './swiper-slides.component.html',
  styleUrls: ['./swiper-slides.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    IonTitle,
    IonButton,
    IonButtons,
    IonToolbar,
    IonIcon,
  ],
  standalone: true
})
export class SwiperSlidesComponent implements AfterViewInit {
  @Input() images!: any[];
  @Input() titulo: string = 'Imágenes';
  swiper?: Swiper;

  constructor() {
    addIcons({ arrowBack, arrowForward });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiper = new SwiperCore('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: () => {
            console.log('Swiper inicializado correctamente');
          },
          transitionEnd: () => {
            // Forzar actualización de la vista si es necesario
          },
        },
      });
    }, 500);
  }

  goNext() {
    this.swiper?.slideNext(500);
  }

  goPrev() {
    this.swiper?.slidePrev(500);
  }
}