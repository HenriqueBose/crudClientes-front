import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  visibleSidebar1: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

}
