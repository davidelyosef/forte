import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { EventsComponent } from './components/events/events.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { InfoComponent } from './components/info/info.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ExhibitionCardComponent } from './components/exhibition-card/exhibition-card.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from "@angular/forms";
import { EventCardComponent } from './components/event-card/event-card.component';
import { PublicationCardComponent } from './components/publication-card/publication-card.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { StoreModule, Store } from '@ngrx/store';
import { userReducer, artistsReducer, exhibitionsReducer, publicationsReducer, eventsReducer } from './store/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './store';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    LoadingPageComponent,
    HeaderComponent,
    LayoutComponent,
    MenuComponent,
    HomeComponent,
    ArtistsComponent,
    ExhibitionsComponent,
    EventsComponent,
    PublicationsComponent,
    InfoComponent,
    CarouselComponent,
    FooterComponent,
    ArtistDetailsComponent,
    ExhibitionCardComponent,
    AdminComponent,
    EventCardComponent,
    PublicationCardComponent,
    AdminPanelComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    StoreModule.forFeature('adminState', userReducer),
    StoreModule.forFeature('artists', artistsReducer),
    StoreModule.forFeature('exhibitions', exhibitionsReducer),
    StoreModule.forFeature('events', eventsReducer),
    StoreModule.forFeature('publications', publicationsReducer),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }


