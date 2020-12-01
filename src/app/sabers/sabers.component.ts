import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Saber } from './saber/saber.modal';
import { SabersService } from './sabers.service';

@Component({
  selector: 'app-sabers',
  templateUrl: './sabers.component.html',
  styleUrls: ['./sabers.component.scss']
})
export class SabersComponent implements OnInit, OnDestroy {

  constructor(private sabersService: SabersService) { }

  sabersSubscription: Subscription;
  sabers: Saber[];
  age: number;
  force: number = 0;
  unlimitedForce: boolean = false;
  isPadawan: boolean = true;

  ngOnInit(): void {
    this.sabersSubscription = this.sabersService.sabersChanged.subscribe((response: Saber[]) => {
      this.sabers = response;
    });
    const sabers = this.sabersService.getSabers();
    if(sabers) {
      this.sabers = sabers;
    } else {
      this.sabersService.getSabers();
    }
  }

  ngOnDestroy() {
    this.sabersSubscription.unsubscribe();
  }

  checkForce() {
    if(this.age > 18 ) {
      this.unlimitedForce = true;
      this.isPadawan = false;
      return;
    }
    this.force = this.age * 10;
    if(this.force >= 93.2) {
      this.isPadawan = false;
    }
  }

  showDetail(id: string) {
    this.sabers.map(saber => {
      if(saber.id === id) {
        saber.showDetail = !saber.showDetail;
      } else {
        saber.showDetail = false;
      }
    })
  }

}
