export interface UsuarioDTO {
  nombreUsuario: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}

export interface LogroDTO{
  descripcion: string;
  objetivo: string;
  tipo: "PARTIDAS_JUGADAS";
  puntosRecompensa: 0;
}
