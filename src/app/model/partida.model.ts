
export interface RespuestaDTO {
  esCorrecta: boolean;
  enunciado: string;
  idRespuesta: number;
}

export interface PreguntaDTO {
  enunciado: string;
  dificultad: number;
  respuesta: RespuestaDTO[]; // correct answers from the API
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
