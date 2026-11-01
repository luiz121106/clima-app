// Valida se as coordenadas estão num intervalo geográfico válido
export function validarCoordenadas(lat: number, lon: number): boolean {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

// Formata o nome da cidade (primeira letra maiúscula)
export function formatarNomeCidade(nome: string): string {
  if (!nome) return "";
  return nome.trim().charAt(0).toUpperCase() + nome.trim().slice(1).toLowerCase();
}

// Converte temperatura de Celsius para Fahrenheit (regra de negócio)
export function celsiusParaFahrenheit(celsius: number): number {
  return Number(((celsius * 9) / 5 + 32).toFixed(1));
}