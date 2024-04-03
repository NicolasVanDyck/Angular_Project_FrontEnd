import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../buttons/login-button/login-button.component';
import { SignUpButtonComponent } from '../buttons/sign-up-button/sign-up-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, SignUpButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isAuthenticated = signal(false);

  constructor(private auth: AuthService) {
    this.auth.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
  }
}
