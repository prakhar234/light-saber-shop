import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SabersComponent } from './sabers/sabers.component';
import { AuthGuard } from './shared/auth-guard';


const routes: Routes = [
  { path: '', component: SabersComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'orders', canActivate:[AuthGuard], component: OrdersComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'manage-sabers', canActivate:[AuthGuard], component: InventoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
