export interface UsuarioDTO {
  nombreUsuario: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}
export interface JugadorRanking {
  posicion: number;
  usuario: string;
  puntosTotales: number;
}
