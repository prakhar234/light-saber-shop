import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private userSub: Subscription;

  isAuthenticated: boolean = false;
  collapsed: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
   this.loginService.user.subscribe(user => {
     this.isAuthenticated = !!user;
   })
  }

  logout() {
    this.loginService.logout();
  }
  manageStock() {
    console.log('Manage Stock');
  }
}
