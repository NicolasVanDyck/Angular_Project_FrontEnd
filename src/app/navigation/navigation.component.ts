import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SignUpButtonComponent } from '../buttons/sign-up-button/sign-up-button.component';
import { LoginButtonComponent } from '../buttons/login-button/login-button.component';
import { LogoutButtonComponent } from '../buttons/logout-button/logout-button.component';
import { RoleService } from '../role.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { AdminDropdownComponent } from '../admin/admin-dropdown/admin-dropdown.component';

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
    AdminDropdownComponent,
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
