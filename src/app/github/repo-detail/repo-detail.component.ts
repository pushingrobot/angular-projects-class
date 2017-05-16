import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {GithubService} from "../shared/github.service";

interface IRepoParams {
  repo?: string;
}

/** TODO */
@Component({
  selector: "repo-detail",
  styleUrls: ["./repo-detail.component.css"],
  templateUrl: "./repo-detail.component.html",
})
export class RepoDetailComponent implements OnInit {

  /** TODO */
  public repoDetails: {} = {};

  /** TODO */
  private org: string|undefined;

  /** TODO */
  private repo: string;

  public constructor(public github: GithubService, private route: ActivatedRoute) {
  }

  /** TODO */
  public ngOnInit(): void {
    this.route.params.subscribe((params: IRepoParams) => {
      const parent: ActivatedRouteSnapshot|null = this.route.snapshot.parent;
      if (parent instanceof ActivatedRouteSnapshot) {
        this.org = parent.params.org as string|undefined;
        if (typeof this.org !== "undefined" &&
            typeof(params.repo) === "string" &&
            params.repo.length > 0) {
          this.repo = params.repo;
          this.github.getRepoForOrg(this.org, this.repo).subscribe((repoDetails: {}) => {
            this.repoDetails = repoDetails;
          });
        }
      }
    });
  }
}
