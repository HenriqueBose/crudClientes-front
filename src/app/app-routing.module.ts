import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {InicioComponent} from "./inicio/inicio.component";
import {ListarClientesComponent} from "./listar-clientes/listar-clientes.component";
import {CadastrarClientesComponent} from "./cadastrar-clientes/cadastrar-clientes.component";

const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path:'inicio', component: InicioComponent},
  {path:'listar', component: ListarClientesComponent},
  {path:'cadastrar', component: CadastrarClientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
