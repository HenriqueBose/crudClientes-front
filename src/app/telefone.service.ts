import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClienteModel} from "./models/cliente.model";
import {environment} from "../environments/environment";
import {TelefoneModel} from "./models/telefone.model";

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http: HttpClient) { }


  findAll(id: number):Observable<Array<TelefoneModel>>{
    return this.http.get<Array<TelefoneModel>>(environment.API + '/api/telefone/find-all/' + id);
  }

  save(telefone : TelefoneModel): Observable<TelefoneModel>{
    return this.http.post<TelefoneModel>(environment.API + '/api/telefone/salvar', telefone)
  }

}
