import { NgModule } from "@angular/core";

import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { GithubService } from "./github/shared/github.service";

import { AppComponent } from "./app.component";
import { rootRouterConfig } from "./app.routes";

import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { RepoBrowserComponent } from "./github/repo-browser/repo-browser.component";
import { RepoDetailComponent } from "./github/repo-detail/repo-detail.component";
import { RepoListComponent } from "./github/repo-list/repo-list.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // RouterModule.forRoot(rootRouterConfig, { useHash: true }),
  ],
  providers: [
    GithubService,
  ],
})
export class AppModule {

}
