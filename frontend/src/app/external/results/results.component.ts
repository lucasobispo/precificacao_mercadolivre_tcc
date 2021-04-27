import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private SearchService: SearchService, private router: Router, private NotificationServe: NotificationService) { }

  phone: Phone;
  result: number;

  ngOnInit(): void {

    if (this.router.getCurrentNavigation()) {
      console.log(this.router.getCurrentNavigation().extras.state.result);
      this.phone = this.router.getCurrentNavigation().extras.state.phone;
      this.result = this.router.getCurrentNavigation().extras.state.result;
    }
    else{
      this.phone = new Phone();
    }
  }

  onSubmit(): void {
    console.log(this.phone)

    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.result = ret;
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

}
