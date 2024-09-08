import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder, private alertService: AlertService, private router: Router, private authService: AuthService,
  ) {
    this.formulariologin = this.fb.group({
      'username':new FormControl  ("", Validators.required),
      'password':new FormControl  ("", Validators.required)
    })
   }
  ngOnInit() {



    this.formulariologin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {

    if (this.formulariologin.valid) {
      console.log('Formulario válido', this.formulariologin.value);
      
      const username = this.formulariologin.get('username')?.value;
      this.authService.setUserName(username);
      this.router.navigate(['/home']);

    } else {

      // Mostrar alert de error

    }

  }


}
