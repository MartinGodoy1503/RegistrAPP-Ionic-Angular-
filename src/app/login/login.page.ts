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
      const password = this.formulariologin.get('password')?.value;
      this.authService.setUserName(username);
      if (await this.authService.login(username, password)) {
        this.router.navigate(['/home']);
      } else {
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    }
    //H 
  }
}
