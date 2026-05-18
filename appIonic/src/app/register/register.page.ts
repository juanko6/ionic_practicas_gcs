import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  forbiddenNameValidator,
  matchFieldsValidator,
} from '../validators/forbidden-name.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  lastSubmittedValue: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.minLength(2), forbiddenNameValidator(/^admin$/i)],
        ],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // Al menos una letra y un dígito
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        aliases: this.fb.array([this.fb.control('', [Validators.minLength(2)])]),
        termsAccepted: [false, [Validators.requiredTrue]],
      },
      { validators: matchFieldsValidator('password', 'confirmPassword') }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  get aliases(): FormArray {
    return this.registerForm.get('aliases') as FormArray;
  }

  aliasControl(i: number): FormControl {
    return this.aliases.at(i) as FormControl;
  }

  addAlias() {
    this.aliases.push(this.fb.control('', [Validators.minLength(2)]));
  }

  removeAlias(i: number) {
    if (this.aliases.length > 1) {
      this.aliases.removeAt(i);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.lastSubmittedValue = this.registerForm.value;
    console.warn('Register submit:', this.lastSubmittedValue);
  }

  reset() {
    this.submitted = false;
    this.lastSubmittedValue = null;
    while (this.aliases.length > 1) {
      this.aliases.removeAt(this.aliases.length - 1);
    }
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      aliases: [''],
      termsAccepted: false,
    });
  }
}
