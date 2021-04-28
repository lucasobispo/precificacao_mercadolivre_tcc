import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  phone: Phone;
  result: number;
  titulo: string;

  constructor(private SearchService: SearchService, private router: Router, private NotificationServe: NotificationService) {

    if (this.router.getCurrentNavigation()) {
      this.phone = this.router.getCurrentNavigation().extras.state.phone;
      this.result = this.router.getCurrentNavigation().extras.state.result;
      this.titulo = this.phone.Marca +" "+ this.phone.Modelo +" "+ this.phone.memory +" "+ this.phone.ram_memory +" "+ this.phone.condition
    }
    else{
      this.phone = new Phone();
    }

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.phone)

    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.result = ret.PRECO;
        this.titulo = this.phone.Marca +" "+ this.phone.Modelo +" "+ this.phone.memory +" "+ this.phone.ram_memory +" "+ this.phone.condition
        // this.titulo = {{phone.Marca}} {{phone.Modelo}} {{phone.memory}} {{phone.ram_memory}} {{phone.condition}};
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

}
