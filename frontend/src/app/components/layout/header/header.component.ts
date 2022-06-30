import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rolAdministrador!:string;
  rolEncargado!:string;
  constructor(public loginService:LoginService) { }

  logout(){
    this.loginService.logout();
  }
  ngOnInit(): void {
    this.rolAdministrador="ADMINISTRADOR";
    this.rolEncargado="ENCARGADO";
  }


}
