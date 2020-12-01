import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Admin } from '../shared/modals/admin.modal';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('authForm') loginForm: NgForm;

  constructor(private loginService: LoginService, private router: Router) { }

  isLoginMode = true;
  isLoading = false;
  error: string = null;


  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.loginForm.form.valid) {
      console.log('Please fill form');
      return;
    }

    let authObs : Observable<Admin>;
    this.isLoading = true;
    authObs = this.loginService.sigin(this.loginForm.form.value);

    authObs.subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['./']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })
  }

  onHandleError() {
    this.error = null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
