import { Component, OnInit } from '@angular/core';
import {ClienteModel} from "../models/cliente.model";
import {ClientesService} from "../clientes.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmailService} from "../email.service";
import {TelefoneService} from "../telefone.service";
import {CepService} from "../cep.service";
import {EmailModel} from "../models/email.model";
import {TelefoneModel} from "../models/telefone.model";
import {lastId} from "primeng/utils/uniquecomponentid";

@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent implements OnInit {

  emailList: EmailModel[] =  [{
    idCliente: 0,
    email: '',
    id: 0
  }];
  telefoneList: TelefoneModel[] =  [{
    idCliente: 0,
    numero: '',
    id: 0
  }];

  cliente: ClienteModel = new ClienteModel();
  alphanumericos : RegExp = /^[\w\-\s]+$/
  emailValido: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  lastId: number;
  selectTipoTelefone: boolean = false;
  celular: boolean = false;


  constructor(private clienteService: ClientesService,
              private confirmationService: ConfirmationService,
              private emailService: EmailService,
              private telefoneService: TelefoneService,
              private cepService: CepService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  buscaEndereco() {
    if (this.cliente.cep.toString().replace('-', '').length == 8) {
      this.cepService.findEndereco(this.cliente.cep).subscribe(response => {
        console.log(response)
        this.cliente.uf = response.uf;
        this.cliente.logradouro = response.logradouro;
        this.cliente.bairro = response.bairro;
        this.cliente.cidade = response.localidade;

      },error => {
        console.log(error)
      })
    }
  }


  cadastrarCliente() {
    this.cliente.cpf = this.cliente.cpf.replace('.', '').replace('.', '').replace('-', '')
    this.cliente.cep = Number(this.cliente.cep.toString().replace('-', ''))
    console.log(this.cliente)
    this.clienteService.salvar(this.cliente).subscribe(response =>{
      // @ts-ignore
      this.lastId = response.msg
      console.log(this.lastId)
      this.salvarEmails();
      this.salvarNumeros();
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!', life: 3000});
      this.limparCampos()
    },error =>{
      console.log(error)
      this.messageService.add({severity:'error', summary: 'Erro', detail: error, life: 3000});
    })

  }

  validaCampos(): boolean{
    if(this.cliente.cpf == undefined || this.cliente.cpf == '' || this.cliente.cep == undefined ||
      this.cliente.cep == null || this.cliente.nome.length > 100 || this.cliente.nome.length < 3 ||
      this.cliente.cidade == undefined || this.cliente.cidade == ''||
      this.cliente.logradouro == undefined || this.cliente.bairro == ''||
      this.cliente.uf == undefined || this.cliente.uf == '' || this.emailList[0].email == undefined || this.emailList[0].email == ''){
      return true;
    }else {
      return false;
    }
  }

  addEmail() {
    this.emailList.push({
      idCliente: 0,
      email: '',
      id: 0
    });
  }
  addTelefone() {
    this.telefoneList.push({
      idCliente: 0,
      numero: '',
      id: 0
    });
  }

  salvarEmails() {
    let self=this;
    this.emailList.forEach(function (value) {
      value.idCliente = self.lastId;
      self.emailService.save(value).subscribe(response=>{
        console.log(response)
      }, error => {
        console.log(error)
      })
    });
  }

  salvarNumeros() {
    let self=this;
    this.telefoneList.forEach(function (value) {
      value.idCliente = self.lastId;
      self.telefoneService.save(value).subscribe(response=>{
        console.log(response)
      }, error => {
        console.log(error)
      })
    });
  }

  teste() {
    console.log(this.celular)
  }

  removeNumero(index: number) {
    this.telefoneList.splice(index, 1)
  }
  removeEmail(index: number) {
    this.emailList.splice(index, 1)
  }

  private limparCampos() {


  }

  validaEmail(i: number) {
      if (this.emailList[i].email.split("@").length -1 != 1){
        this.emailList[i].email = ''
        this.messageService.add({severity:'warning', summary: 'Cuidado', detail: 'Insira um email válido', life: 3000});
      }
  }
}
