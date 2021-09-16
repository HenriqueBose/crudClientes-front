import { Component, OnInit } from '@angular/core';
import {ClienteModel} from "../models/cliente.model";
import {ClientesService} from "../clientes.service";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmailService} from "../email.service";
import {TelefoneService} from "../telefone.service";
import {EmailModel} from "../models/email.model";
import {TelefoneModel} from "../models/telefone.model";
import {CepService} from "../cep.service";
import {createSelf} from "@angular/compiler/src/core";

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Array<ClienteModel> = []
  listEmail: Array<EmailModel> = []
  listTelefone: Array<TelefoneModel> = []
  dialogEditar: boolean = false;
  clienteSelecionado : ClienteModel = new ClienteModel();

  constructor(private clienteService: ClientesService,
              private confirmationService: ConfirmationService,
              private emailService: EmailService,
              private telefoneService: TelefoneService,
              private cepService: CepService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshData()

  }

  abriEditarCliente(cliente: any) {
    this.preencheClienteSelecionado(cliente);
    this.emailService.findAll(cliente.id).subscribe(response =>{
      console.log('lista email ' + response)
      this.listEmail = response;
    })
    this.telefoneService.findAll(cliente.id).subscribe(response=>{
      console.log('lista telefone ' + response)
      this.listTelefone = response
    })
    this.dialogEditar = true;
  }

  async editarCliente() {
    console.log('editar clientes')
    await this.clienteService.editar(this.clienteSelecionado).subscribe(response => {
      console.log('response', response);
      this.refreshData()

    })

    this.editarEmails();
    this.editarTelefones();
    this.dialogEditar = false;
  }

  deletarCliente(id: number) {
    this.clienteService.deletar(id).subscribe(response =>{
      console.log(response)
      this.ngOnInit()
    })
  }

  visualizarCliente(cliente: any) {

  }

  fecharDialogEditar() {
    this.dialogEditar = false;
  }

  deletarClienteSelecionado(id:number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar esse cliente?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletarCliente(id)
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cliente deletado', life: 3000});

      }
    });
  }

  buscaEndereco() {
    if (this.clienteSelecionado.cep.toString().length == 8) {
      this.cepService.findEndereco(this.clienteSelecionado.cep).subscribe(response => {
        console.log(response)
        this.clienteSelecionado.uf = response.uf;
        this.clienteSelecionado.logradouro = response.logradouro;
        this.clienteSelecionado.bairro = response.bairro;
        this.clienteSelecionado.cidade = response.localidade;

      },error => {
        console.log(error)
      })
    }
  }

  editarEmails() {
    let self = this;
    this.listEmail.forEach(function (value) {
      console.log(value)
      self.emailService.save(value).subscribe(response =>{
        console.log(response)
      })
    });
  }

  editarTelefones() {
    let self = this;
    this.listTelefone.forEach(function (value) {
      console.log(value)
      self.telefoneService.save(value).subscribe(response =>{
        console.log(response)
      })
    });
  }

  alteraNumero(index: number, value: any) {
    console.log(value)
    this.listTelefone[index].numero = value;
    console.log(this.listTelefone[index])
  }

  alteraEmail(index: number, value: any){
    console.log(value)
    this.listEmail[index].email = value;
    console.log(this.listEmail[index])
  }

  private preencheClienteSelecionado(cliente: any) {
    this.clienteSelecionado.id = cliente.id;
    this.clienteSelecionado.nome = cliente.nome;
    this.clienteSelecionado.cpf = cliente.cpf;
    this.clienteSelecionado.cep = cliente.cep;
    this.clienteSelecionado.cidade = cliente.cidade;
    this.clienteSelecionado.uf = cliente.uf;
    this.clienteSelecionado.logradouro = cliente.logradouro;
    this.clienteSelecionado.bairro = cliente.bairro
    this.clienteSelecionado.complemento = cliente.complemento;


  }

  refreshData() {
    this.clienteService.findAll().subscribe( response =>{
      console.log(response)
      this.clientes = response;
      console.log('lista de clientes ' + this.clientes);
    })
  }
}
