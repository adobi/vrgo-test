import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import {RepositoryComponent} from "./repository/repository.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent},
  { path: 'repositories/:page',  component: HomeComponent, pathMatch: 'prefix' },
  { path: 'repository/:user/:repo',  component: RepositoryComponent },
  { path: '**',    component: NoContentComponent },
];
