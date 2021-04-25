import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { SearchService } from './services/search.service';

import { HomeComponent } from './external/home/home.component';
import { AboutComponent } from './external/about/about.component';
import { ModelfinderComponent } from './external/modelfinder/modelfinder.component';
import { ResultsComponent } from './external/results/results.component';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';

import { DropDownListModule } from 'smart-webcomponents-angular/dropdownlist';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    DropDownListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    SearchService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
