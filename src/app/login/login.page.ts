import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder, private router: Router, private authService: AuthService,
  ) {
    this.formulariologin = this.fb.group({
      'username':new FormControl  ("", Validators.required),
      'password':new FormControl  ("", Validators.required)
    })
   }
  ngOnInit() {

    this.formulariologin = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
    });

  }

  async onSubmit() {
    if (this.formulariologin.valid) {
      const username = this.formulariologin.get('username')?.value;
      const password = this.formulariologin.get('password')?.value; // Obtiene la contraseña
  
      // Establece el nombre de usuario para mostrarlo en pantalla
      this.authService.setUserName(username);
  
      // Llama al método login pasando username y password
      this.authService.login(username, password)
        .subscribe({
          next: (user) => {
            // Si el login es exitoso, redirige al home
            this.router.navigate(['/home']);
          },
          error: (err) => {
            // Manejo de error, puedes mostrar un mensaje al usuario
            console.error(err);
            alert('Credenciales inválidas'); // Muestra un mensaje de alerta al usuario
          }
        });
    } else {
      // Manejo de error si el formulario no es válido
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  

}
