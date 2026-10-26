/**
 * Alertas personalizadas (reemplazan a window.alert).
 */

const DURACION_MS = 3500;

export const mostrarAlerta = (contenedor, mensaje, tipo = 'info') => {
  const alerta = document.createElement('div');
  alerta.className = `alerta alerta-${tipo}`;
  alerta.setAttribute('role', 'alert');
  alerta.textContent = mensaje;

  contenedor.replaceChildren(alerta);

  setTimeout(() => {
    if (alerta.isConnected) alerta.remove();
  }, DURACION_MS);
};
