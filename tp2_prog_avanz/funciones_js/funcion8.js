function procesarArray(array, funcion) {
    const resultado = [];

    for (const elemento of array) {
        resultado.push(funcion(elemento));
    }

    return resultado;
}

function multiplicarPorDos(numero) {
    return numero * 2;
}

const numeros = [1, 2, 3, 4, 5];

const resultado = procesarArray(numeros, multiplicarPorDos);

console.log(resultado);