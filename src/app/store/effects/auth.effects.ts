import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
  } from '../actions/auth.actions';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // effects go here
  
  @Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
LogInSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS),
  tap((user) => {
    localStorage.setItem('token', user.payload.token);
    this.router.navigateByUrl('/');
  })
);

@Effect({ dispatch: false })
LogInFailure: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_FAILURE)
);


}