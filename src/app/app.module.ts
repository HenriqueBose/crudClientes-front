import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import { InicioComponent } from './inicio/inicio.component';
import {ToolbarModule} from "primeng/toolbar";
import {SidebarModule} from "primeng/sidebar";
import {TemplateModule} from "./template/template.module";
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputNumberModule} from "primeng/inputnumber";
import {RadioButtonModule} from "primeng/radiobutton";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {RatingModule} from "primeng/rating";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ListarClientesComponent,
    CadastrarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    SidebarModule,
    TemplateModule,
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    TableModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
