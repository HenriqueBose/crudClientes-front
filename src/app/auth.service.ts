import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClienteModel} from "./models/cliente.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.API + "/api/login"
  tokenURL: string = environment.API + environment.getTokenURL;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {

  }

  isAuthenticated():boolean{
    const token = this.getToken();
    if (token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }


  getToken(){
    const tokenString = localStorage.getItem('access_token')
    if (tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  logar(login: string, senha:string): Observable<any>{
    const params = new HttpParams()
      .set('username', login)
      .set('password', senha)
      .set('grant_type', 'password')
    const headers= {
      'Authorization': 'Basic '+ btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL,params.toString(), {headers})
  }

  findRoleByLogin(login: string): Observable<any> {
    return this.http.get(this.apiURL+ '/find-role/' + login)
  }
}
