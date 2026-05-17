import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerData = {
    username: '',
    password: '',
  };

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  validarContrasenia(contrasenia: string): boolean {

    // Check minimum length
    if (contrasenia.length < 6) {
      this.errorMessage = 'The password must contain at least 6 characters';
    }

    // Check maximum length
    if (contrasenia.length > 20) {
      this.errorMessage = 'The password cannot contain more than 20 characters';
    }

    // Check for at least one letter
    if (!/[A-Za-z]/.test(contrasenia)) {
      this.errorMessage = 'The password must contain at least one letter';
    }

    // Check for at least one number
    if (!/[0-9]/.test(contrasenia)) {
      this.errorMessage = 'The password must contain at least one number';
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(contrasenia)) {
      this.errorMessage = 'The password must contain at least one uppercase letter';
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasenia)) {
      this.errorMessage = 'The password must contain at least one special character (!@#$%^&*)';
    }

    // Check for spaces
    if (/\s/.test(contrasenia)) {
      this.errorMessage = 'The password must not contain spaces';
    }

    return this.errorMessage.length === 0;
  }

  onSubmit() {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.registerData.username || !this.registerData.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (
      this.registerData.username.includes('>') ||
      this.registerData.username.includes('<') ||
      this.registerData.username.includes('/') ||
      this.registerData.username.includes('*')
    ) {
      this.errorMessage = 'The username cannot contain special characters';
      return;
    }

    if (!this.validarContrasenia(this.registerData.password)) {
      this.errorMessage;
      return;
    }

    this.isLoading = true;

    const userToRegister = {
      nombreUsuario: this.registerData.username,
      password: this.registerData.password,
    };

    console.log('Registering user:', userToRegister);

    this.authService.register(userToRegister).subscribe({

      next: (response) => {

        this.isLoading = false;

        console.log('Successful registration:', response);

        this.successMessage = 'Registration successful!';
        console.log('Displayed success message:', this.successMessage);

        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (error) => {

        this.isLoading = false;

        console.error('Registration error:', error);

        if (error.status === 409) {
          this.errorMessage = 'The username already exists';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid data. Verify the information';
        } else if (error.status === 401) {
          this.errorMessage = 'Unauthorized. Please try again';
        } else if (error.status === 200) {
          this.successMessage = 'User registered successfully 🎉';
        } else {
          this.errorMessage = 'Error registering user ' + this.errorMessage;
        }

        console.log('Displayed error message:', this.errorMessage);

        this.cdr.detectChanges();
      },
    });
  }
}
