import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup = this.fb.group({});

  constructor(public  fb: FormBuilder) {
    this.formulariologin = this.fb.group({
      'username':new FormControl  ("", Validators.required),
      'password':new FormControl  ("", Validators.required)
    })
   }
  ngOnInit() {
  }

  onSubmit() {
  }
}
