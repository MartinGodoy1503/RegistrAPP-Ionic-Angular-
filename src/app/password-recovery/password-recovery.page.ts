import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  formularioPasswordRecovery: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder,private alertService: AlertService) { }

  ngOnInit() {
    this.formularioPasswordRecovery = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async onSubmit() {
    if (this.formularioPasswordRecovery.valid) {
      console.log('Formulario válido', this.formularioPasswordRecovery.value);
      
      const email = this.formularioPasswordRecovery.get('email')?.value;
      const message = `El enlace de recuperación de contraseña ha sido enviado a ${email}.`;

      await this.alertService.presentAlert('Éxito', message);    
      
    } else {

      // Mostrar alert de error

    }
  }
} 
