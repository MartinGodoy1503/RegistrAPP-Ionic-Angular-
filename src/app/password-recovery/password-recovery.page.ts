import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  formularioPasswordRecovery: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder) { }

  ngOnInit() {
    this.formularioPasswordRecovery = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    if (this.formularioPasswordRecovery.valid) {
      console.log('Formulario válido', this.formularioPasswordRecovery.value);
    } else {
      // Mensaje de error 
      console.log('Formulario inválido');
    }
  }
} 
