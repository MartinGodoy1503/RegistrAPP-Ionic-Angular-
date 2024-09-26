import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userName?: string;
  private isLoggedIn = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('userName');
  }

  setUserName(name: string) {
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  getUserName(): string {
    return localStorage.getItem('userName') || this.userName || '';
  }
}