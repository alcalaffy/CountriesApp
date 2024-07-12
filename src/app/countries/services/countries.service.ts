import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string='https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  };

  private saveLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('cacheStore')){
      return;
    }
    this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesReq(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=>of ([])),
      );
  }
  searchCapital(term:string):Observable<Country[]>{
    const url:string=`${this.apiUrl}/capital/${term}`;
    return this.getCountriesReq(url)
    .pipe(
      tap(
        countries=>this.cacheStore.byCapital={term,countries}
      ),
      tap(
        ()=>this.saveLocalStorage()
      )
    );
  }

  searchCountry(term:string):Observable<Country[]>{
    const url:string=`${this.apiUrl}/name/${term}`;
    return this.getCountriesReq(url)
    .pipe(
      tap(
        countries=>this.cacheStore.byCountries={term,countries}
      ),
      tap(
        ()=>this.saveLocalStorage()
      )
    );
  }

  searchRegion(region:Region):Observable<Country[]>{
    const url:string=`${this.apiUrl}/region/${region}`;
    return this.getCountriesReq(url)
    .pipe(
      tap(
        countries=>this.cacheStore.byRegion={region,countries}
      ),
      tap(
        ()=>this.saveLocalStorage()
      )
    );
  }

  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    const url:string=`${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries=>countries.length>0?countries[0]:null),
      catchError(err=>{
        return of (null)
      }
    )
    );
  }
}
