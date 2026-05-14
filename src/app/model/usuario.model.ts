export interface UsuarioDTO {
  usuario: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}
