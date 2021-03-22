import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './external/home/home.component';
import { AboutComponent } from './external/about/about.component';

const routes: Routes = [
  {
    path: '',
	  component: HomeComponent,
	  pathMatch: 'full'
  },
  {
    path: 'about',
	component: AboutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
