import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  lastSubmittedValue: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  /**
   * setValue requiere la estructura COMPLETA — ideal para cargar
   * el perfil desde un servicio/backend.
   */
  loadFullProfile() {
    this.profileForm.setValue({
      firstName: 'Andreu',
      lastName: 'García',
      email: 'andreu@example.com',
      bio: 'Estudiante de Ingeniería Informática.',
    });
  }

  /**
   * patchValue permite actualizaciones PARCIALES — útil para
   * autocompletados o sincronización con cambios externos.
   */
  patchFirstName() {
    this.profileForm.patchValue({ firstName: 'Andreu' });
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.lastSubmittedValue = this.profileForm.value;
    console.warn('Profile submit:', this.lastSubmittedValue);
  }

  reset() {
    this.submitted = false;
    this.lastSubmittedValue = null;
    this.profileForm.reset({ firstName: '', lastName: '', email: '', bio: '' });
  }
}
