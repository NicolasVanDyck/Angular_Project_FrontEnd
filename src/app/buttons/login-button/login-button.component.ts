import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent {
  isAuthenticated = signal(false);
  constructor(private auth: AuthService) {}
  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/',
      },
      authorizationParams: {
        prompt: 'login', //other possibilities: https://auth0.github.io/auth0-spa-js/interfaces/AuthorizationParams.html#prompt,
      },
    });
  }
}
