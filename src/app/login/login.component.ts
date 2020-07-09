import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import { ILogin } from '../Services/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: ILogin = {
    email: "admin@gmail.com",
    phone:"01152015432",
    password: "admin123"
  };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  account: {
    username: string,
    password: string
  } = {
    username: '',
    password: ''
  };
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
      login() {

      if (this.loginForm.invalid) {
          return;
      }
      else{
        if((this.account.username == this.model.email ||this.account.username == this.model.phone ) && this.account.password == this.model.password){
          console.log("Login successful");
          localStorage.setItem('isLoggedIn', "true");
         this.router.navigate(['/dashboard']);
         this.toastr.success('Login successfully', 'Welcome');
        }
        else{
          this.message = "Please check your username and password";
          this.toastr.error(' Please check your username and password', 'Error!');

        }
      }    
  }

}
