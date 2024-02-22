import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'review', component: ReviewComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
