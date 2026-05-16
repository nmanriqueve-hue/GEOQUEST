import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule,CommonModule],
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
      alert('Por favor, completa All los campos');
      return;
    }

    if (this.isLoading) return;
    this.isLoading = true;
    this.errorMessage = '';
    const loginRequest = {
      usuario: this.loginData.username,
      password: this.loginData.password,
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login exitoso:', response);
        this.successMessage = '¡Inicio de sesión exitoso!';
        console.log('Mensaje de error mostrado:', this.successMessage);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en login:', error);
        if (error.status === 0) {
          this.errorMessage = 'Error de conexión. Verifica que el servidor esté corriendo.';
        } else if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        } else if (error.status === 403) {
          this.errorMessage = 'No tienes permiso para acceder. Contacta al administrador.';
        } else if (error.status === 400) {
          this.errorMessage = 'Error en los datos enviados. Verifica el formato.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error interno del servidor. Intenta más tarde.';
        } else {
          this.errorMessage = error.error?.message || error.error || 'Error al iniciar sesión. Intenta de nuevo.';
        }
        console.log('Mensaje de error mostrado:', this.errorMessage);
        this.cdr.detectChanges();
      },

    });
  }
}
