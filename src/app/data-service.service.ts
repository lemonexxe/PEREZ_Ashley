import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnivTurkey } from './univ-turkey.model';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(
    private http : HttpClient
  ) { }

  fetchData(): Observable<any> {
    return this.http.get<UnivTurkey[]>('http://universities.hipolabs.com/search?name=middle&country=Turkey');
  }
}
