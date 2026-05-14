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

    // Verificar longitud mínima
    if (contrasenia.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Verificar longitud máxima
    if (contrasenia.length > 20) {
      this.errorMessage = 'La contraseña no puede tener más de 20 caracteres';
    }

    // Verificar que tenga al menos una letra
    if (!/[A-Za-z]/.test(contrasenia)) {
      this.errorMessage = 'La contraseña debe contener al menos una letra';
    }

    // Verificar que tenga al menos un número
    if (!/[0-9]/.test(contrasenia)) {
      this.errorMessage = 'La contraseña debe contener al menos un número';
    }

    // Verificar que tenga al menos una mayúscula
    if (!/[A-Z]/.test(contrasenia)) {
      this.errorMessage = 'La contraseña debe contener al menos una mayúscula';
    }

    // Verificar que tenga al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasenia)) {
      this.errorMessage = 'La contraseña debe contener al menos un carácter especial (!@#$%^&*)';
    }

    // Verificar que no tenga espacios
    if (/\s/.test(contrasenia)) {
      this.errorMessage = 'La contraseña no debe contener espacios';
    }

    return this.errorMessage.length === 0;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.registerData.username || !this.registerData.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    if (
      this.registerData.username.includes('>') ||
      this.registerData.username.includes('<') ||
      this.registerData.username.includes('/') ||
      this.registerData.username.includes('*')
    ) {
      this.errorMessage = 'El nombre de usuario no puede contener caracteres especiales';
      return;

    }

    if (!this.validarContrasenia(this.registerData.password)) {
      this.errorMessage;
      return;
    }

    this.isLoading = true;
    const userToRegister = {
      usuario: this.registerData.username,
      password: this.registerData.password,
    };

    console.log('Registrando usuario:', userToRegister);

    this.authService.register(userToRegister).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso!';
        console.log('Mensaje de error mostrado:', this.successMessage);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en registro:', error);
        if (error.status === 409) {
          this.errorMessage = 'El nombre de usuario ya existe';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Verifica la información';
        } else if (error.status === 401) {
            this.errorMessage = 'No autorizado. Intenta de nuevo';
        } else if (error.status === 200) {
          this.successMessage = 'Usuario registrado exitosamente 🎉';
        } else {
          this.errorMessage = 'Error al registrar el usuario ' + this.errorMessage;
        }
        console.log('Mensaje de error mostrado:', this.errorMessage);
        this.cdr.detectChanges();
      },
    });
  }
}
