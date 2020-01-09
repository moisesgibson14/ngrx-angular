import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: User = new User();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
