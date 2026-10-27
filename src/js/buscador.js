const escaparHTML = (texto) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Resalta con <mark> lo que coincide con el patrón.
// Si se da "nuevaPalabra", la coincidencia se cambia por esa palabra.
const resaltar = (texto, patron, nuevaPalabra) => {
  const partes = texto.split(new RegExp('(' + patron + ')', 'gi'));
  let html = '';

  for (let i = 0; i < partes.length; i++) {
    if (i % 2 === 1) {
      html += '<mark>' + escaparHTML(nuevaPalabra || partes[i]) + '</mark>';
    } else {
      html += escaparHTML(partes[i]);
    }
  }

  return { total: (partes.length - 1) / 2, html };
};

// Busca una palabra o carácter
export const procesarTexto = (texto, termino) => {
  if (!termino || termino.trim() === '') {
    return { total: 0, html: escaparHTML(texto) };
  }
  return resaltar(texto, escaparRegex(termino));
};

// Busca varias palabras separadas por comas (ej: "hola, adiós")
export const procesarVariasPalabras = (texto, listaPalabras) => {
  const palabras = listaPalabras
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p !== '');

  if (palabras.length === 0) {
    return { total: 0, html: escaparHTML(texto), detalle: {} };
  }

  // De más larga a más corta, para que "hola mundo" se detecte antes que "hola"
  const patron = palabras
    .map(escaparRegex)
    .sort((a, b) => b.length - a.length)
    .join('|');

  // Cuántas veces apareció cada palabra
  const detalle = {};
  const encontradas = texto.match(new RegExp(patron, 'gi')) || [];
  encontradas.forEach((p) => {
    const clave = p.toLowerCase();
    detalle[clave] = (detalle[clave] || 0) + 1;
  });

  return { ...resaltar(texto, patron), detalle };
};

// Reemplaza la palabra "origen" por la palabra "destino"
export const convertirPalabras = (texto, origen, destino) =>
  resaltar(texto, escaparRegex(origen), destino);