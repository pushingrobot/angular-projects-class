import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GithubService } from "../shared/github.service";

/** TODO */
@Component({
  selector: "repo-browser",
  templateUrl: "./repo-browser.component.html",
  styleUrls: ["./repo-browser.component.css"],
})
export class RepoBrowserComponent {

  public constructor(private router: Router, private github: GithubService) {
  }

/** TODO */
  public searchForOrg(orgName: string): void {
    this.github.getOrg(orgName)
      .subscribe(async (): Promise<boolean> =>
        this.router.navigate(["/github", orgName]));
  }

}
