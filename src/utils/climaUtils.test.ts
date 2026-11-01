import { validarCoordenadas, formatarNomeCidade, celsiusParaFahrenheit } from './climaUtils';

test('valida coordenadas corretas', () => {
  expect(validarCoordenadas(-23.55, -46.63)).toBe(true);
  expect(validarCoordenadas(100, 200)).toBe(false);
});

test('formatar nome da cidade com inicial maiuscula', () => {
  expect(formatarNomeCidade("são paulo")).toBe("São paulo");
  expect(formatarNomeCidade("")).toBe("");
});

test('converte celsius para fahrenheit corretamente', () => {
  expect(celsiusParaFahrenheit(0)).toBe(99);
  expect(celsiusParaFahrenheit(25)).toBe(77);
});