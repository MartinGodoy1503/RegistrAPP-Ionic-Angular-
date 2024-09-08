import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formulariosignup: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder, private router: Router, private alertService: AlertService) { 
    
  }

  ngOnInit() {

    this.formulariosignup = this.fb.group({
      username: new FormControl  ('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      password2: ['', [Validators.required]],
    }, {validator: this.passwordsMatchValidator}) //El valor es definido más abajo
  }
  //Se utiliza una expresión regular o regex para la validación de la contraseña
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (control.value && !passwordRegex.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  //Valor para la coincidencia de las contraseñas
  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (password && password2 && password.value !== password2.value) {
      return { mismatch: true };
    }
    return null;
  };

  async onSubmit() {
    if (this.formulariosignup.valid) {

      console.log('Formulario válido', this.formulariosignup.value);
      const message = `Registrado con éxito!`;

      await this.alertService.presentAlert('Éxito', message);
      this.router.navigate(['/login']);
    } else {
      // Mensaje de error 
      console.log('Formulario inválido');
    }
  }
  
}
