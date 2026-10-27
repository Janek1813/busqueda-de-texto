import './css/styles.css';
import { procesarTexto, procesarVariasPalabras, convertirPalabras } from './js/buscador';
import { mostrarAlerta } from './js/alertas';

const elementos = {
  texto: document.getElementById('texto'),
  busqueda: document.getElementById('busqueda'),
  palabras: document.getElementById('palabras'),
  btnBuscar: document.getElementById('btn-buscar'),
  btnEnlazar: document.getElementById('btn-enlazar'),
  btnConvertir: document.getElementById('btn-convertir'),
  btnLimpiar: document.getElementById('btn-limpiar'),
  contador: document.getElementById('contador'),
  resultado: document.getElementById('resultado'),
  alertas: document.getElementById('alertas'),
};

const alertar = (mensaje, tipo) => mostrarAlerta(elementos.alertas, mensaje, tipo);

const buscar = () => {
  const texto = elementos.texto.value;
  const termino = elementos.busqueda.value;

  if (!texto.trim()) {
    alertar('Escribe un texto antes de buscar.', 'error');
    return;
  }
  if (!termino) {
    alertar('Indica la palabra o carácter a buscar.', 'error');
    return;
  }

  const { total, html } = procesarTexto(texto, termino);
  elementos.resultado.innerHTML = html;
  elementos.contador.textContent = total;

  if (total === 0) {
    alertar(`No se encontró "${termino}" en el texto.`, 'advertencia');
  } else {
    alertar(`Se encontraron ${total} coincidencia(s).`, 'exito');
  }
};

const enlazar = () => {
  const texto = elementos.texto.value;
  const lista = elementos.palabras.value;

  if (!texto.trim()) {
    alertar('Escribe un texto antes de enlazar palabras.', 'error');
    return;
  }

  const hayPalabras = lista.split(',').some((p) => p.trim() !== '');
  if (!hayPalabras) {
    alertar('Escribe las palabras separadas por comas. Ejemplo: hola, adiós.', 'error');
    return;
  }

  const { total, html, detalle } = procesarVariasPalabras(texto, lista);
  elementos.resultado.innerHTML = html;
  elementos.contador.textContent = total;

  if (total === 0) {
    alertar('Ninguna de las palabras se encontró en el texto.', 'advertencia');
  } else {
    const resumen = Object.entries(detalle)
      .map(([palabra, cantidad]) => `${palabra}: ${cantidad}`)
      .join(', ');
    alertar(`Se encontraron ${total} coincidencia(s) (${resumen}).`, 'exito');
  }
};

const convertir = () => {
  const texto = elementos.texto.value;
  const [origen, destino] = elementos.palabras.value.split(',').map((p) => p.trim());

  if (!texto.trim()) {
    alertar('Escribe un texto antes de convertir.', 'error');
    return;
  }
  if (!origen || !destino) {
    alertar('Escribe dos palabras separadas por coma. Ejemplo: hola, adiós.', 'error');
    return;
  }

  const { total, html } = convertirPalabras(texto, origen, destino);
  elementos.resultado.innerHTML = html;
  elementos.contador.textContent = total;

  if (total === 0) {
    alertar(`No se encontró "${origen}" en el texto.`, 'advertencia');
  } else {
    alertar(`¡Conversión realizada! "${origen}" se convirtió en "${destino}" (${total} vez/veces).`, 'conversion');
  }
};

const limpiar = () => {
  elementos.texto.value = '';
  elementos.busqueda.value = '';
  elementos.palabras.value = '';
  elementos.resultado.textContent = '';
  elementos.contador.textContent = '0';
  elementos.texto.focus();
  alertar('Pantalla limpiada.', 'info');
};

elementos.btnBuscar.addEventListener('click', buscar);
elementos.btnEnlazar.addEventListener('click', enlazar);
elementos.btnConvertir.addEventListener('click', convertir);
elementos.btnLimpiar.addEventListener('click', limpiar);

elementos.busqueda.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') buscar();
});
elementos.palabras.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') enlazar();
});