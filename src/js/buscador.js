export const procesarTexto = (texto, termino) => {
    const regex = new RegExp(
        termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'gi'
    );

    const coincidencias = texto.match(regex) || [];
    const html = texto.replace(regex, '<mark>$&</mark>');

    return {
        total: coincidencias.length,
        html: html
    };
};