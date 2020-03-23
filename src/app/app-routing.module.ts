import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { EventsComponent } from './components/events/events.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { InfoComponent } from './components/info/info.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { ExhibitionCardComponent } from './components/exhibition-card/exhibition-card.component';
import { AdminComponent } from './components/admin/admin.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { PublicationCardComponent } from './components/publication-card/publication-card.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "artists",  component: ArtistsComponent },
  { path: "artists/:fullName", component: ArtistDetailsComponent },
  { path: "exhibitions", component: ExhibitionsComponent },
  { path: "exhibitions/:exhibition", component: ExhibitionCardComponent },
  { path: "events", component: EventsComponent },
  { path: "events/:event", component: EventCardComponent },
  { path: "publications", component: PublicationsComponent },
  { path: "publications/:publication", component: PublicationCardComponent },
  { path: "info", component: InfoComponent },
  { path: "forte_great_admin", component: AdminComponent },
  { path: "forte_great_admin_panel1", component: AdminPanelComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
