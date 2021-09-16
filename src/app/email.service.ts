import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TelefoneModel} from "./models/telefone.model";
import {environment} from "../environments/environment";
import {EmailModel} from "./models/email.model";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


  findAll(id: number):Observable<Array<EmailModel>>{
    return this.http.get<Array<EmailModel>>(environment.API + '/api/email/find-all/' + id);
  }

  save(email : EmailModel): Observable<EmailModel>{
    return this.http.post<EmailModel>(environment.API + '/api/email/salvar', email)
  }

}
