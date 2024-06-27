import { Component, OnInit } from '@angular/core';
import { ErrorItemResponse, ErrorResponseDetails, LoginRequest, Error } from '../../../models';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    email: "pj",//this needs to be removed, testing purposes only
    password: "P@ssw0rd" //this needs to be removed, testing purposes only
  };

  loading: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorItem: ErrorItemResponse[] = [{
    message: ''
  }];

  errorDetails: ErrorResponseDetails = { 
    message: '', 
    code: 0,
    errors: this.errorItem
  };
  error: Error = { 
    error: this.errorDetails
  };

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    if (isLoggedIn) {
      this.isLoggedIn = true;

      this.router.navigate(['books']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.userService.login(this.loginRequest).subscribe({
      next: (data => {
        console.debug(`logged in successfully ${data}`);
        console.log(data);
        this.loading = false;
        this.tokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['books']);
      }),
      error: ((error: Error) => {
        this.loading = false;
        this.error = error;
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      })

    });
  }
}