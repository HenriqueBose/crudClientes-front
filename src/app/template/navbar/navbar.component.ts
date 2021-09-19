import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario = sessionStorage.getItem('login')
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sair() {
    localStorage.removeItem('access_token')
    this.router.navigate(['login'])
  }

  home() {
    this.router.navigate(['inicio'])
  }
}
