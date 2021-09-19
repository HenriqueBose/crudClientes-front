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
import {ClientesService} from "./clientes.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmailService} from "./email.service";
import {TelefoneService} from "./telefone.service";
import {CepService} from "./cep.service";
import {NgxMaskModule} from "ngx-mask";
import {KeyFilterModule} from "primeng/keyfilter";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {InputSwitchModule} from "primeng/inputswitch";
import { LayoutComponent } from './layout/layout.component';
import {TokenInterceptor} from "./token.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ListarClientesComponent,
    CadastrarClientesComponent,
    LayoutComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    ToastModule,
    InputTextModule,
    BrowserAnimationsModule,
    NgxMaskModule,
    KeyFilterModule,
    MessageModule,
    InputTextareaModule,
    InputMaskModule,
    InputSwitchModule
  ],
  providers: [
    ClientesService,
    ConfirmationService,
    MessageService,
    EmailService,
    TelefoneService,
    CepService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
