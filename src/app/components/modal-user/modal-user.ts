import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { AuthPayload } from '../../models/Auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-user.html',
  styleUrl: './modal-user.sass'
})
export class ModalUser {
 isLoginMode: boolean = true; 
  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public matDialogRef: MatDialogRef<ModalUser>
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.data && this.data.mode === 'register') {
      this.isLoginMode = false;
    }
  }


  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset({
      email: '',
      password: '',
    });
  }




  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.authForm.value;

    const payload: AuthPayload = {
      email,
      password,
    };

    let authCall: Observable<any>;
    let successMessage: string;

    if (this.isLoginMode) {
      authCall = this.authService.login(payload);
      successMessage = 'Inicio de sesión exitoso.';
    } else {
      authCall = this.authService.register(payload);
      successMessage = 'Registro exitoso. Sesión iniciada.';
    }

    authCall.subscribe({
      next: (response) => {
        console.log(successMessage, response);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
      }
    });
  }

  closeModal(): void {
    this.matDialogRef.close();
  }
}
