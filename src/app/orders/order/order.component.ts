import { Component, Input, OnInit } from '@angular/core';
import { style, trigger, state, transition, animate } from '@angular/animations';

import { Order } from 'src/app/shared/modals/order.modal';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('section', [
      state('in', style({
        opacity: 1,
        height: '100%'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          height: '0'
        }),
        animate(200)
      ])
    ])
  ]
})
export class OrderComponent implements OnInit {

  constructor() { }

  @Input() order: Order;

  ngOnInit(): void {
  }


}
