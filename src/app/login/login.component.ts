import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  senha: any;

  errorLogin: boolean;


  constructor(private router: Router,
  private authService: AuthService) {

  }

  ngOnInit(): void {

  }


  teste() {
    console.log('senha' + this.senha);
    console.log('login' + this.login);
    sessionStorage.setItem('login', this.login)
    this.authService.logar(this.login, this.senha).subscribe(response =>{
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token)
      console.log(response)
      const login = sessionStorage.getItem('login')
      if(login){
        this.authService.findRoleByLogin(login).subscribe(response=>{
          const roleString = JSON.stringify(response);
          const role = JSON.parse(roleString).role;
          sessionStorage.setItem('role', role)
          this.router.navigate(['/inicio'])
        }, error=>{
          console.log(error)
        })
      }

    }, error => {
      this.errorLogin = true;
      console.log(error)
    })

    //this.router.navigate(['inicio'])

  }
}
