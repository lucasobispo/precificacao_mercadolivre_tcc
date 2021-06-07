import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Phone } from '../phone.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // url: string = "http://3.227.36.209:5000"; ///IP da nuvem
  url: string = "http://54.197.239.43:5000"; ///IP da nuvem
  // url: string = "http://127.0.0.1:5000"; //IP Local
  phone: Phone;
  constructor(private http: HttpClient) { }

  // corsHeaders = new HttpHeaders({
  //   'Cache-Control': 'no-cache',
  //   // 'Accept': '*/*',
  //   // 'Accept-Encoding': 'gzip, deflate, br',
  //   // 'Connection': 'keep-alive',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Headers': 'http://35.174.167.124:5000',
  //   'Accept': 'application/json',
  // });

  search(object: Phone): Observable<any> {
    this.phone = object;
    var object1 = {
    "modelo_do_processador_y": this.phone.modelo_do_processador_y,
    "com_leitor_de_impressao_digital": this.phone.com_leitor_de_impressao_digital.id,
    "modelo_renomeado_upper": this.phone.modelo.toUpperCase(),
    "condition": this.phone.condition.id,
    "com_nfc": this.phone.com_nfc.id,
    "Linha": this.phone.Linha,
    "Marca": this.phone.Marca,
    "memoria_interna": this.phone.memoria_interna,
    "memoria_ram": this.phone.memoria_ram
    }

    // console.log(object1);

    // var object1 = {
    //   "memory": 64,
    //   "ram_memory": 2,
    //   "Marca": "Apple",
    //   "Modelo": "iPhone 8",
    //   "condition": "new"
    // }

    return this.http.post(this.url + '/predict', object1)
      .pipe(
        catchError(this.handleError)
      );

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    console.log(errorMessage);
    return throwError(error.error);

  }
}
