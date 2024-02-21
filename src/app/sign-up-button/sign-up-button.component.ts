import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-up-button.component.html',
  styleUrls: ['./sign-up-button.component.css'],
})
export class SignUpButtonComponent {
  isAuthenticated = signal(false);
  constructor(private auth: AuthService) {}

  handleSignup(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  }
}
