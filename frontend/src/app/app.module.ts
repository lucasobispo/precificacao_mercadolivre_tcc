import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './external/home/home.component';
import { AboutComponent } from './external/about/about.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { DropDownListModule } from 'smart-webcomponents-angular/dropdownlist';
import { ModelfinderComponent } from './external/modelfinder/modelfinder.component';
import { ResultsComponent } from './external/results/results.component';
//import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ModelfinderComponent,
    ResultsComponent,
    //SwiperModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropDownListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
