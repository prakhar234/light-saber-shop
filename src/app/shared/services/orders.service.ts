import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Order } from 'src/app/shared/modals/order.modal';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private http: HttpClient){}

    saberOrdered = new Subject<boolean>();
    ordersChanged = new Subject<Order[]>();

    getOrders() {
        this.http.get<Order[]>(`https://saber-shop.firebaseio.com/orders.json`).subscribe(orders => {
            console.log(orders);
            if(orders) {
                orders = Object.keys(orders).map(ordKey => {
                    return {
                        ...orders[ordKey],
                        showDetail: false,
                        orderId: ordKey
                    }
                });
                this.ordersChanged.next(orders);
                return;
            }
            
            this.ordersChanged.next([]);
        })
        
    }

    order(orderData: Order){
        return this.http.post<Order>(`https://saber-shop.firebaseio.com/orders.json`, orderData)
        .pipe(catchError(this.handleError));
    }

    setOrder(order: Order) {
        return this.http.put<Order>(`https://saber-shop.firebaseio.com/orders/${order.orderId}.json`, order)
        .pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = "Something went wrong! Please try again later";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorRes.error.error);
        }
        return throwError(errorMessage);
    }
}