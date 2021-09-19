import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role:string | null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
  }

  navegarListar() {
    this.router.navigate(['listar'])
  }

  navegarCadastrar() {
    this.router.navigate(['cadastrar'])
  }
}
