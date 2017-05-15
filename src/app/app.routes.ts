import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { RepoBrowserComponent } from "./github/repo-browser/repo-browser.component";
import { RepoDetailComponent } from "./github/repo-detail/repo-detail.component";
import { RepoListComponent } from "./github/repo-list/repo-list.component";
import { HomeComponent } from "./home/home.component";

export const rootRouterConfig: Routes = [
  { path: "contact", component: ContactComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

// export const rootRouterConfig: Routes = [
//   { path: "home", component: HomeComponent },
//   { path: "about", component: AboutComponent },
//   { path: "github", component: RepoBrowserComponent,
//     children: [
//       { path: "", component: RepoListComponent },
//       { path: ":org", component: RepoListComponent,
//         children: [
//           { path: "", component: RepoDetailComponent },
//           { path: ":repo", component: RepoDetailComponent },
//         ],
//       }],
//   },
//   { path: "contact", component: ContactComponent },
//   { path: "", redirectTo: "home", pathMatch: "full" },
// ];
