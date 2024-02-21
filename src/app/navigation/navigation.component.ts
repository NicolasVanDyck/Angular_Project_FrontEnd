import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SignUpButtonComponent } from '../sign-up-button/sign-up-button.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { map } from 'rxjs';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignUpButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  // isAuthenticated = signal(false);
  isAdmin = signal(false);

  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
  constructor(
    private auth: AuthService,
    public roleService: RoleService,
  ) {
    // this.auth.isAuthenticated$.subscribe((auth) => {
    //   this.isAuthenticated.set(auth);
    // });
    // this.roleService.hasPermission('getall:contents').subscribe((r) => {
    //   this.isAdmin.set(r);
    // });
  }
}
