import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/observable";

import "rxjs/add/operator/map";

export interface IGitHubJSON {
  name?: string;
}

/** TODO */
@Injectable() // tslint:disable-line
export class GithubService {
  public constructor(private http: Http) {}

  /** TODO */
  public getOrg(org: string): Observable<IGitHubJSON> {
    return this.makeRequest(`orgs/${org}`);
  }

  /** TODO */
  public getRepoForOrg(org: string, repo: string): Observable<IGitHubJSON> {
    return this.makeRequest(`repos/${org}/${repo}`);
  }

  /** TODO */
  public getReposForOrg(org: string): Observable<IGitHubJSON> {
    return this.makeRequest(`orgs/${org}/repos`);
  }

  /** TODO */
  private makeRequest(path: string): Observable<IGitHubJSON> {
    const url: string = `https://api.github.com/${ path }`;
    const params: URLSearchParams = new URLSearchParams();
    params.set("per_page", "100");

    return this.http.get(url, {search: params})
      .map((res: Response) => res.json() as IGitHubJSON );
  }
}
