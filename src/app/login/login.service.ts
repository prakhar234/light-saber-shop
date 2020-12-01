import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Admin } from '../shared/modals/admin.modal';
import { User } from '../shared/modals/user.modal';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(private http: HttpClient, private router: Router){}

    user = new BehaviorSubject<User>(null);
    private expirationDurationTimer: any;

    sigin(form) {
        return this.http.post<Admin>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDISadg_ne9tqLPaQJXO7PVQI_o0zxbKNg`, 
        {...form, returnSecureToken: true})
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));

    }

    handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const tokenExpirationData = new Date(new Date().getTime() + expiresIn * 1000);
        const user =  new User(email, userId, token, tokenExpirationData );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
    }
       
    logout() {
        this.user.next(null);
        this.router.navigate(['./']);
        localStorage.removeItem("userData");
        if(this.expirationDurationTimer) {
            clearTimeout(this.expirationDurationTimer);
        }
    }

    autoLogout(expirationDuration: number) {
        this.expirationDurationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const userData:  {email: string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem("userData"));
        
        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An error occured.";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case "EMAIL_EXISTS":
                errorMessage = "This email already exists";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is invalid.";
                break;
            case "USER_DISABLED":
                errorMessage = "The user account has been disabled by an administrator.";
                break;
            default: 
                errorMessage = "An error occured!";
        }
        return throwError(errorMessage);
    }
}