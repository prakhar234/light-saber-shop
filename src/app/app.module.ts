import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SabersComponent } from './sabers/sabers.component';
import { OrdersComponent } from './orders/orders.component';
import { SaberComponent } from './sabers/saber/saber.component';
import { SharedModule } from './shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './orders/order/order.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SabersComponent,
    OrdersComponent,
    SaberComponent,
    CheckoutComponent,
    OrderComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
