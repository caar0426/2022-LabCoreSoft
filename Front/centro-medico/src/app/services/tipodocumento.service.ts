import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServiceResponse } from '../models/service.response.model';

@Injectable({
    providedIn: 'root'
  })
  export class TipoDocumentoService {
    private baseUrl = 'https://localhost:7014';

    constructor(private http: HttpClient, private router: Router) { 
        
      }
    getTipoDocumento(): Observable<ServiceResponse | null> {
      return this.http.get<ServiceResponse>(this.baseUrl + '/api/TipoDocumento')
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(['error']);
            return of(null);
          } else {
            throw error;
          }
        })
      );
  }
  
}