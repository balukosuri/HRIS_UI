import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class QualificationSpecializationService {
  //baseUri:string = 'https://whispering-caverns-64340.herokuapp.com';
  //baseUri: string = 'http://localhost:3500';
  baseUri:string = 'http://lmsapi1997.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  addQualificationSpecialization(data): Observable<any> {
    let url = `${this.baseUri}/qualificationSpecialization`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  getQualificationSpecialization() {
    return this.http.get(`${this.baseUri}/qualificationSpecialization`);
  }
  getQualificationSpecializationById(qualification_specialization_id): Observable<any> {
    let url = `${this.baseUri}/qualificationSpecialization/${qualification_specialization_id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateQualificationSpecialization(qualification_specialization_id, data): Observable<any> {
    let url = `${this.baseUri}/qualificationSpecialization/${qualification_specialization_id}`;
    return this.http
      .put(url, data, {
        headers: {
          // "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
