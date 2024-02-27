import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentFormComponent } from './content/content-form/content-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'review', component: ReviewComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, adminGuard],
  },
  { path: 'admin/content', component: ContentListComponent },
  { path: 'admin/content/form', component: ContentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
