export interface RespuestaDTO {
  esCorrecta: boolean;
  enunciado: string;
  idRespuesta: number;
}

export interface PreguntaDTO {
  enunciado: string;
  dificultad: number;
  respuesta: RespuestaDTO[];
  idPregunta: number;
}

export interface PartidaDTO {
  fecha: string;
  puntosTotales: number;
  nivelDificultad: number;
  respuestasCorrectas: number;
  estado: string;
  preguntas: PreguntaDTO[];
  idPartida: number;
}

