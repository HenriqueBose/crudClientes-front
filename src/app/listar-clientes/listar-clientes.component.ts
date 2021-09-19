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


  role: string | null;
  clientes: Array<ClienteModel> = []
  listEmail: Array<EmailModel> = []
  listTelefone: Array<TelefoneModel> = []
  dialogEditar: boolean = false;
  dialogVisualizar: boolean = false;
  clienteSelecionado : ClienteModel = new ClienteModel();

  constructor(private clienteService: ClientesService,
              private confirmationService: ConfirmationService,
              private emailService: EmailService,
              private telefoneService: TelefoneService,
              private cepService: CepService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')
    this.refreshData()

  }

  abriEditarCliente(cliente: any) {
    this.preencheClienteSelecionado(cliente);
    this.buscarContatoCliente(cliente);
    this.dialogEditar = true;
  }

  async editarCliente() {
    this.clienteSelecionado.cpf = this.clienteSelecionado.cpf.replace('.', '').replace('.', '').replace('-', '')
    this.clienteSelecionado.cep = Number(this.clienteSelecionado.cep.toString().replace('-', ''))
    console.log('editar clientes')
    await this.clienteService.editar(this.clienteSelecionado).subscribe(response => {
      console.log('response', response);
      this.refreshData()
      this.editarEmails();
      this.editarTelefones();
      this.dialogEditar = false;
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cliente editado com sucesso!'});
    }, error => {
      console.log(error)
      this.messageService.add({severity:'error', summary:'Erro', detail:error.error_description});
    })

  }

  deletarCliente(id: number) {
    this.clienteService.deletar(id).subscribe(response =>{
      console.log(response)
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cliente deletado', life: 3000});
      this.ngOnInit()
    }, error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Não foi possível deletar o cliente.', life: 3000});
    })
  }

  visualizarCliente(cliente: any) {
    this.preencheClienteSelecionado(cliente)
    this.buscarContatoCliente(cliente)
    this.dialogVisualizar = true;
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


      }
    });
  }

  buscaEndereco() {
    if (this.clienteSelecionado.cep.toString().length == 9) {
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

  buscarContatoCliente(cliente: any) {
    this.emailService.findAll(cliente.id).subscribe(response =>{
      console.log('lista email ' + response)
      this.listEmail = response;
    })
    this.telefoneService.findAll(cliente.id).subscribe(response=>{
      console.log('lista telefone ' + response)
      this.listTelefone = response
    })

  }

  validaCampos(): boolean{
    if(this.clienteSelecionado.cpf == undefined || this.clienteSelecionado.cpf == '' || this.clienteSelecionado.cep == undefined ||
      this.clienteSelecionado.cep == null ||this.clienteSelecionado.cep == 0 || this.clienteSelecionado.nome.length > 100 || this.clienteSelecionado.nome.length < 3 ||
      this.clienteSelecionado.cidade == undefined || this.clienteSelecionado.cidade == ''||
      this.clienteSelecionado.logradouro == undefined || this.clienteSelecionado.bairro == ''||
      this.clienteSelecionado.uf == undefined || this.clienteSelecionado.uf == '' ){
      return true;
    }else {
      return false;
    }
  }

}
