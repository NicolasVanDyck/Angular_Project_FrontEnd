import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentFormComponent } from './content/content-form/content-form.component';
import {PlatformListComponent} from "./platform/platform-list/platform-list.component";
import {PlatformFormComponent} from "./platform/platform-form/platform-form.component";
import {GameListComponent} from "./game/game-list/game-list.component";
import {GameFormComponent} from "./game/game-form/game-form.component";
import {VarietyListComponent} from "./variety/variety-list/variety-list.component";
import {VarietyFormComponent} from "./variety/variety-form/variety-form.component";

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
  { path: 'admin/platform', component: PlatformListComponent },
  { path: 'admin/platform/form', component: PlatformFormComponent },
  { path: 'admin/game', component: GameListComponent},
  { path: 'admin/game/form', component: GameFormComponent},
  { path: 'admin/variety', component: VarietyListComponent},
  { path: 'admin/variety/form', component: VarietyFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
