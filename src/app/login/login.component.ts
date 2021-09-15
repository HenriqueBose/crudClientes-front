import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  senha: any;


  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }


  teste() {
    console.log('senha' + this.senha);
    console.log('login' + this.login);
    sessionStorage.setItem('user', this.login)
    this.router.navigate(['inicio'])

  }
}
