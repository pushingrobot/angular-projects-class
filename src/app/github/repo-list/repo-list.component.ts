import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {GithubService, IGitHubJSON} from "../shared/github.service";

interface IOrgParams {
  org?: string;
}

/** TODO */
@Component({
  selector: "repo-list",
  styleUrls: ["./repo-list.component.css"],
  templateUrl: "./repo-list.component.html",
})
export class RepoListComponent implements OnInit {

  /** TODO */
  public org: string|undefined;

  /** TODO */
  public repos: Observable<IGitHubJSON>;

  public constructor(public github: GithubService, private route: ActivatedRoute) {
  }

  /** TODO */
  public ngOnInit(): void {
    this.route.params.subscribe((params: IOrgParams) => {
      this.org = params.org;
      if (typeof(this.org) === "string" && this.org.length > 0) {
        this.repos = this.github.getReposForOrg(this.org);
      }
    });
  }
}
