import {Component, OnInit, ViewChild} from '@angular/core';
import {DigimonService} from "../services/digimon-api/digimon.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {Digimon, DigimonList} from "../interfaces/DigimonList";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {
  digimons: Digimon[] = [];
  page: number = 0;
  pageSize: number = 10;
  totalPages: number = 14;
  selectedDigimon: any;
  @ViewChild('popover') popover: any;
  isOpen: boolean = false;


  constructor(
    private digimonService: DigimonService
  ) {
  }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    if ( this.page <= this.totalPages) {
      this.digimonService.getDigimons({page: this.page, pageSize: this.pageSize}).subscribe((res: DigimonList) => {
        this.digimons.push(...res.content);
        this.page += 1;
        this.totalPages = res.pageable.totalPages;
      });
    }

  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  presentPopover(e: Event, digimon: any) {
    this.popover.event = e;
    this.selectedDigimon = digimon;
    this.isOpen = true;
  }
}
