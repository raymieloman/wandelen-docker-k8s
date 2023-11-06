import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wandeling} from "../model/wandeling";

@Injectable({
  providedIn: 'root'
})
export class WandelingService {

  constructor(private httpClient: HttpClient) {
  }

  public getWandelings(): Observable<Wandeling[]> {
    return this.httpClient.get<Wandeling[]>('http://localhost:8080/api/wandelings');
  }

}
