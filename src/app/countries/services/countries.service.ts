import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }
  private getCountriesReq(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=>of ([])),
      );
  }
  searchCapital(term:string):Observable<Country[]>{
    const url:string=`${this.apiUrl}/capital/${term}`;
    return this.getCountriesReq(url);
  }

  searchCountry(term:string):Observable<Country[]>{
    const url:string=`${this.apiUrl}/name/${term}`;
    return this.getCountriesReq(url);
  }

  searchRegion(term:string):Observable<Country[]>{
    const url:string=`${this.apiUrl}/region/${term}`;
    return this.getCountriesReq(url);
  }

  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    const url:string=`${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries=>countries.length>0?countries[0]:null),
      catchError(err=>{
        console.log(err)
        return of (null)
      }
    )
    );
  }
}
