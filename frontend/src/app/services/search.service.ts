import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Phone } from '../phone.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url: string = "http://35.174.167.124:5000"; ///colocar o IP
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
      "memory": 64,
      "ram_memory": 2,
      "Marca": "Apple",
      "Modelo": "iPhone 8",
      "condition": "new"
    }

    return this.http.post(this.url + '/predict', object)
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
