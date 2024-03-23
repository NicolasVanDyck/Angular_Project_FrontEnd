import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentFormComponent } from './content/content-form/content-form.component';
import { PlatformListComponent } from './platform/platform-list/platform-list.component';
import { PlatformFormComponent } from './platform/platform-form/platform-form.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameFormComponent } from './game/game-form/game-form.component';
import { VarietyListComponent } from './variety/variety-list/variety-list.component';
import { VarietyFormComponent } from './variety/variety-form/variety-form.component';
import { WalkthroughComponent } from './walkthrough/walkthrough.component';
import { writerGuard } from './writer.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: HomeComponent },
  { path: 'reviews', component: ReviewComponent },
  { path: 'walkthroughs', component: WalkthroughComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, adminGuard],
    children: [
      { path: 'content', component: ContentListComponent },
      { path: 'content/form', component: ContentFormComponent },
      { path: 'platform', component: PlatformListComponent },
      { path: 'platform/form', component: PlatformFormComponent },
      { path: 'game', component: GameListComponent },
      { path: 'game/form', component: GameFormComponent },
      { path: 'variety', component: VarietyListComponent },
      { path: 'variety/form', component: VarietyFormComponent },
    ],
  },
  {
    path: 'writer',
    canActivate: [AuthGuard, writerGuard],
    children: [
      { path: 'content', component: ContentListComponent },
      { path: 'content/form', component: ContentFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
