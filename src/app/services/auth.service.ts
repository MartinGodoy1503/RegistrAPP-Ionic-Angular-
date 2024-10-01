import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //CURRENT USER = USUARIO ACTUAL
  //USER SUBJECT = ASUNTO DEL USUARIO

  private apiUrl = 'http://localhost:3000/usuarios'; // SERVIDOR JSON
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private userName?: string;

  constructor(private http: HttpClient, private router: Router) {
    // SE INTENTA OBTENER EL USUARIO ALMACENADO EN LOCALSTORAGE
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
   }
  
    // OBTENER EL VALOR ACTUAL DEL USUARIO 
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // METODO PARA MANEJAR EL INICIO DE SESION
  login(username: string, password: string) {
    // SE BUSCAN COINCIDENCIAS CON ALGUN USUARIO MEDIANTE LOS CAMPOS USERNAME Y PASSWORD UTILIZANDO UNA SOLICITUD GET 
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(map(users => {

        // SI SE ENCUENTRA UN USUARIO SE ALMACENA EN LOCALSTORAGE Y SE ACTUALIZA SU ESTADO 

        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // SE RETORNA EL USUARIO
          return user; 
        } else {
          throw new Error('Credenciales inválidas'); // SE LANZA UN ERROR SI LAS CREDENCIALES NO SON VALIDAS
        }

      }));
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      // CONVERTIR DE STRING A OBJETO
      return JSON.parse(user); 
    }
    // SI NO HAY USUARIO LOGUEADO
    return null; 
  }

  logout() {
    // ELIMINA AL USUARIO DE LOCALSTORAGE Y ACTUALIZAMOS EL ESTADO A NULL
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
    // REDIRIGIR AL USUARIO A LA PAGINA DE INICIO DE SESION
    this.router.navigate(['/login']);
  }

   // VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
   isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // OBTENER EL ROL DEL USUARIO ACTUALMENTE AUTENTICADO
  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // SI EL USUARIO TIENE UN ROL, LO DEVOLVEMOS
    return user?.rol || null; 
  }

  setUserName(name: string) {
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  getUserName(): string {
    return localStorage.getItem('userName') || this.userName || '';
  }
}