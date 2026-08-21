function obtenerPagina(datos, numeroPagina) {
    const elementosPorPagina = 5;

    const inicio = (numeroPagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;

    return datos.slice(inicio, fin);
}

const datos = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13, 14, 15
];

console.log("Página 1:", obtenerPagina(datos, 1));
console.log("Página 2:", obtenerPagina(datos, 2));
console.log("Página 3:", obtenerPagina(datos, 3));