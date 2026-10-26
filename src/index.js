import './css/styles.css';
import { procesarTexto } from './js/buscador';
import { mostrarAlerta } from './js/alertas';

const elementos = {
  texto: document.getElementById('texto'),
  busqueda: document.getElementById('busqueda'),
  btnBuscar: document.getElementById('btn-buscar'),
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

const limpiar = () => {
  elementos.texto.value = '';
  elementos.busqueda.value = '';
  elementos.resultado.textContent = '';
  elementos.contador.textContent = '0';
  elementos.texto.focus();
  alertar('Pantalla limpiada.', 'info');
};

elementos.btnBuscar.addEventListener('click', buscar);
elementos.btnLimpiar.addEventListener('click', limpiar);
elementos.busqueda.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') buscar();
});
