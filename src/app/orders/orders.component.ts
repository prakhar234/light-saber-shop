import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Saber } from '../sabers/saber/saber.modal';
import { SabersService } from '../sabers/sabers.service';
import { Order } from '../shared/modals/order.modal';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private ordersService: OrdersService, private sabersService: SabersService) { }

  ordersSubscription: Subscription;
  saberSubscription: Subscription;

  orders: Order[];
  saber: Saber;

  error: boolean = false;

  ngOnInit(): void {
    this.ordersService.getOrders();
    this.ordersSubscription = this.ordersService.ordersChanged.subscribe(response => {
      this.orders = response;
    });
    this.saberSubscription = this.sabersService.saber.subscribe(saber => {
      this.handleSaberAvailability(saber);
    })
  }

  handleSaberAvailability(saber: Saber) {
    saber.available = saber.available - 1;
    this.sabersService.setSaber(saber);
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
    this.saberSubscription.unsubscribe();
  }

  showDetails(id: string) {
    this.orders.map(order => {
      if(order.orderId === id) {
        order.showDetail = !order.showDetail;
      } else {
        order.showDetail = false;
      }
    })
  }

  onHandleError(){
    this.error = null;
  }

  acceptOrder(id: String, saberId: string) {
    const order = this.orders.find(order => order.orderId === id);
    order.accepted = true;
    this.ordersService.setOrder(order).subscribe(() => {
      const saber = this.sabersService.getSaber(saberId);
      if(saber) {
        this.handleSaberAvailability(saber);
      }
    }, error => {
      this.error = error;
    });
  }

}
