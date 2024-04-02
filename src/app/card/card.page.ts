import {Component, Input} from '@angular/core';
import {Digimon} from "../interfaces/DigimonList";

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage  {
  @Input() digimon: Digimon = {
    id: 0,
    name: '',
    image: '',
    href: '',
  };

  constructor() {
  }

  handleImageError(event: any): void {
    event.target.src = '/assets/404.png';
  }
}
