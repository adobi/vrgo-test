import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import {RepositoryComponent} from "./repository/repository.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'repository/:id',  component: RepositoryComponent },
  { path: '**',    component: NoContentComponent },
];
