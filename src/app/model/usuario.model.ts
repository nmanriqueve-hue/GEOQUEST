export interface UsuarioDTO {
  nombreUsuario: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}
