import {
  Component,
  OnInit
} from '@angular/core';

import {Github} from "../services/github";
import {PaginationComponent} from "../pagination/pagination.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'home',
  providers: [
      PaginationComponent
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public repositories = [];
  public lastPage = 0;
  public currentPage = 1;
  public userName = 'addyosmani';
  constructor(
    private github: Github,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    console.log('constructor');
  }

  public ngOnInit() {
    console.log('hello `Home` component');

    let page = +this.route.snapshot.params['page'];
console.log(page)
    if (page) {
      this.currentPage = page;
    }
    this.getUserRepos(this.userName, this.currentPage);
  }

  protected getUserRepos(userName: string, currentPage: number)
  {
    this.repositories = [];
    this.github.getUserRepos(userName, currentPage).then((response: any) => {
      this.repositories = response;
      this.lastPage = this.github.lastPage;
    });
  }

  public currentPageChanged(event)
  {
    console.log("Home current page changed", event);
    this.getUserRepos(this.userName, event);

    this.router.navigate(['repositories', event]);
  }
}
