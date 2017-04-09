import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import {Github} from "../services/github";

@Component({
  selector: 'home',
  providers: [
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public repositories = [];
  public lastPage = 0;
  constructor(
    public appState: AppState,
    public github: Github
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');

    this.getUserRepos();
  }

  protected getUserRepos()
  {
    this.github.getUserRepos('adobi', 1).then((response: any) => {
      this.repositories = response;
      this.lastPage = this.github.lastPage;
    });

  }
}
