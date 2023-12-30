import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  nameSubmitted = false;
  passwordSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          ),
        ],
      ],
    });

    this.gf['name']?.valueChanges.subscribe(() => {
      this.nameSubmitted = false;
    });

    this.gf['password']?.valueChanges.subscribe(() => {
      this.passwordSubmitted = false;
    });
  }
  get gf() {
    return this.loginForm.controls;
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.nameSubmitted = true;
      this.passwordSubmitted = true;
    } else {
      this.nameSubmitted = false;
      this.passwordSubmitted = false;
      if (
        this.gf['name'].value == 'John' &&
        this.gf['password'].value == 'Hello@123'
      ) {
        this.snackbarService.openSnackBar('Login');
        this.router.navigate(['/dashboard']);
      } else {
        this.snackbarService.openSnackBar('Incorrect-password');
      }
    }
  }
}
