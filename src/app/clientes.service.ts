import { Injectable } from '@angular/core';
import {ClienteModel} from "./models/cliente.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {



  constructor(private http: HttpClient) {

  }

   salvar(cliente : ClienteModel): Observable<ClienteModel>{
      return this.http.post<ClienteModel>(environment.API + '/api/clientes/salvar', cliente)
  }

  findAll():Observable<Array<ClienteModel>>{
    return this.http.get<Array<ClienteModel>>(environment.API + '/api/clientes/find-all');
  }

  editar(cliente: ClienteModel): Observable<ClienteModel>{
    return this.http.post<ClienteModel>(environment.API + '/api/clientes/editar', cliente);

  }

  deletar(id: number){
    return this.http.delete(environment.API + '/api/clientes/deletar/' + id);
  }

}
