import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PacienteGet } from '../models/paciente.get.model';
import { ServiceResponse } from '../models/service.response.model';
import { PacientePost } from '../models/paciente.post.model';
import { PacientePut } from '../models/paciente.put.model';

@Injectable({
    providedIn: 'root'
  })
  export class PacienteService {
    private baseUrl = 'https://localhost:7014';

    constructor(private http: HttpClient, private router: Router) { 
        
      }
    getPaciente(): Observable<ServiceResponse | null> {
      return this.http.get<ServiceResponse>(this.baseUrl + '/api/Paciente')
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

  createPaciente(paciente: PacientePost) {
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });
    debugger
    return this.http.post<ServiceResponse>(`${this.baseUrl}/api/Paciente`, paciente, { headers })
    .pipe(
      catchError(error => {
        debugger
        if (error.status >=400) {
          this.router.navigate(['error']);
          return of(null);
        } else {
          throw error;
        }
      })
    );
  }

  getPacienteById(id:string) {
        
    var rta = this.http.get<ServiceResponse>(`${this.baseUrl}/api/Paciente/${id}`)
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
    return rta;
  }

  updatePaciente(paciente: PacientePut) {
    const headers = new HttpHeaders({
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    });
    return this.http.put<ServiceResponse>(`${this.baseUrl}/api/Paciente/${paciente.id}`, paciente, { headers })
    .pipe(
        catchError(error => {
            if (error.status >= 400) {
                this.router.navigate(['error']);
                return of(null);
            } else {
                throw error;
            }
        })
    );
}


  deletePaciente(id: number) {
    return this.http.delete<ServiceResponse>(`${this.baseUrl}/api/Paciente/${id}`)
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