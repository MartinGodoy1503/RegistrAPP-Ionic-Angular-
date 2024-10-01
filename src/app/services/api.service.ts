import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  apiURL = 'http://localhost:3000/usuarios';
  
  constructor(private http:HttpClient) { }

  // OBTENER TODOS LOS USUARIOS
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  // CREAR USUARIO
  addUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  // ACTUALIZAR USUARIO
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, usuario);
  }

  // ELIMINAR USUARIO
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

}
