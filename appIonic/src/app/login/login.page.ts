import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  lastSubmittedValue: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  // Acceso rápido a los controles para usar en el template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // Snapshot inmutable del estado en el momento del envío
    this.lastSubmittedValue = this.loginForm.value;
    console.warn('Login submit:', this.lastSubmittedValue);
  }

  reset() {
    this.submitted = false;
    this.lastSubmittedValue = null;
    this.loginForm.reset({ email: '', password: '', remember: false });
  }
}
