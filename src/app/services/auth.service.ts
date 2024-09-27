import { Injectable } from '@angular/core';
import { DBTaskService } from './dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userName?: string;
  private isLoggedIn = false;

  constructor(private dbTask: DBTaskService) { }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.dbTask.getUser(username, password);

    if (user) {
      this.isLoggedIn = true;
      localStorage.setItem('userName', username); 
      return true;
    }

    return false;
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