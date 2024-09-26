import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName?: string;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    
  }

  
}