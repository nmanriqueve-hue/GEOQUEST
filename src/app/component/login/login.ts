import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    username: '',
    password: '',
  };

  isLoading = false;
  errorMessage = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.loginData.username || !this.loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    const loginRequest = {
      nombreUsuario: this.loginData.username,
      password: this.loginData.password,
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;

        console.log('Successful login:', response);

        this.successMessage = 'Login successful!';
        console.log('Displayed success message:', this.successMessage);

        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Login error:', error);

        if (error.status === 0) {
          this.errorMessage =
            'Connection error. Verify that the server is running.';
        } else if (error.status === 401) {
          this.errorMessage =
            'Incorrect username or password. Please verify your credentials.';
        } else if (error.status === 403) {
          this.errorMessage =
            'You do not have permission to access. Contact the administrator.';
        } else if (error.status === 400) {
          this.errorMessage =
            'Error in the submitted data. Verify the format.';
        } else if (error.status === 500) {
          this.errorMessage =
            'Internal server error. Please try again later.';
        } else {
          this.errorMessage =
            error.error?.message ||
            error.error ||
            'Error logging in. Please try again.';
        }

        console.log('Displayed error message:', this.errorMessage);

        this.cdr.detectChanges();
      },
    });
  }
}
