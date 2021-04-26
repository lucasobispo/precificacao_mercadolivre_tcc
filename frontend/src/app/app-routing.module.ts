import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './external/home/home.component';
import { AboutComponent } from './external/about/about.component';
import { ModelfinderComponent } from './external/modelfinder/modelfinder.component';
import { ResultsComponent } from './external/results/results.component';

const routes: Routes = [
  {
    path: '',
	  component: HomeComponent,
	  pathMatch: 'full'
  },
  {
    path: 'about',
	component: AboutComponent
  },
  {
    path: 'modelfinder',
	component: ModelfinderComponent
  },
  {
    path: 'results',
	component: ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
