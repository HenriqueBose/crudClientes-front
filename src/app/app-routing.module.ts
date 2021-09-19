import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {InicioComponent} from "./inicio/inicio.component";
import {ListarClientesComponent} from "./listar-clientes/listar-clientes.component";
import {CadastrarClientesComponent} from "./cadastrar-clientes/cadastrar-clientes.component";
import {LayoutComponent} from "./layout/layout.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path: '', component: LayoutComponent, children: [
      {path:'inicio', component: InicioComponent, canActivate: [AuthGuard]},
      {path:'listar', component: ListarClientesComponent, canActivate: [AuthGuard]},
      {path:'cadastrar', component: CadastrarClientesComponent, canActivate: [AuthGuard]},
      {path: '', redirectTo: '/login', pathMatch: 'full'}
    ]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
