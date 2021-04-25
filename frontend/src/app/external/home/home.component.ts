import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownListComponent } from 'smart-webcomponents-angular/dropdownlist';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('dropdownlist', { read: DropDownListComponent, static: false }) dropdownlist: DropDownListComponent;
  constructor(private SearchService: SearchService, private route: Router, private NotificationServe: NotificationService) { }

  phone: Phone = new Phone();

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.phone)

    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.route.navigateByUrl('/results',{state:{phone:this.phone, result: ret}});
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

}


