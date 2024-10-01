import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName?: string;   // VARIABLE PARA ALMACENAR NOMBRE DEL USUARIO 
  userRole: string | null = ''; // VARIABLE PARA ALMACENAR EL ROL DEL USUARIO 
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
  }

  
}