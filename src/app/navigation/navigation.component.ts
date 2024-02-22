import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SignUpButtonComponent } from '../sign-up-button/sign-up-button.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { RoleService } from '../role.service';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignUpButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserInfoComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  isAuthenticated = signal(false);
  isAdmin = signal(false);
  constructor(
    private auth: AuthService,
    public roleService: RoleService,
  ) {
    this.auth.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
    this.roleService.hasPermission('getall:contents').subscribe((r) => {
      this.isAdmin.set(r);
    });
  }
}
