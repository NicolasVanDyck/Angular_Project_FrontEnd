import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentFormComponent } from './content/content-form/content-form.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameFormComponent } from './game/game-form/game-form.component';
import { PlatformListComponent } from './platform/platform-list/platform-list.component';
import { PlatformFormComponent } from './platform/platform-form/platform-form.component';
import { VarietyListComponent } from './variety/variety-list/variety-list.component';
import { VarietyFormComponent } from './variety/variety-form/variety-form.component';

@NgModule({
  declarations: [AppComponent, GameListComponent, GameFormComponent, PlatformListComponent, PlatformFormComponent, VarietyListComponent, VarietyFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavigationComponent,
    AuthModule.forRoot({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: environment.redirectUri,
        audience: environment.AUTH0_AUDIENCE,
      },
      httpInterceptor: {
        allowedList: [
          `${environment.api_url}/Content`,
          `${environment.api_url}/Content/*`,
        ],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
