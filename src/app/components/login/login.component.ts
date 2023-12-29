import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router:Router,private snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
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

    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }
  get gf() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      this.submitted = true;
    } else {
      this.submitted = false;
      if (this.gf['name'].value == 'John' && this.gf['password'].value == 'Hello@123') {
        this.snackbarService.openSnackBar('Login')
        this.router.navigate(['/dashboard'])
      } else {
        this.snackbarService.openSnackBar('incorrect-password')
      }
    }
  }
}
