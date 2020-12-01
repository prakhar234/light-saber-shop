import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SabersService } from '../sabers/sabers.service';
import { OrdersService } from '../shared/services/orders.service';
import { Order } from '../shared/modals/order.modal';
import { Saber } from '../sabers/saber/saber.modal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private sabersService: SabersService, private ordersService: OrdersService) { }

  contactFormSubmitted: boolean = false;
  @ViewChild('contactForm') contactForm: NgForm;
  orderData: Order;
  error: boolean = false;
  saberOrderSuccessfull: boolean = false;
  orderError: string = null;

  queryParamSubscription: Subscription;
  saberSubscription: Subscription;

  ngOnInit(): void {
    this.queryParamSubscription = this.route.queryParams.subscribe(queryParams => {
      const saberId = queryParams.saberId;
      const saber = this.sabersService.getSaber(saberId);
      if(saber) {
        this.setOrderData(saber);
      }
    });
    this.saberSubscription = this.sabersService.saber.subscribe(response => {
      this.setOrderData(response);
    });
  }

  setOrderData(saber: Saber) {
    this.orderData = {
      saberId: saber.id,
      saberName: saber.name,
      cost: saber.crystal.planet * saber.crystal.powerUsage,
      saberColor: saber.crystal.color,
      saberCrystal: saber.crystal.name,
      contactDetails: null,
      accepted: false
    }
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
    this.saberSubscription.unsubscribe();
  }

  onSubmitContact() {
    if(!this.contactForm.form.valid) {
      this.error = true;
      return;
    }

    this.orderData.contactDetails = {
      ...this.contactForm.form.value
    };
    this.contactFormSubmitted = true;

  }

  onHandleError() {
    this.orderError = null;
    if(this.saberOrderSuccessfull) {
      this.router.navigate(['/']);
    }
  }

  handleOrder() {
    this.ordersService.order(this.orderData).subscribe(response => {
      this.saberOrderSuccessfull = true;
      this.orderError = "Your order is successfull. Please click on Close to go to Sabers page. "
    }, error => {
      this.saberOrderSuccessfull = false;
      this.orderError = error;
    });
  }

}
