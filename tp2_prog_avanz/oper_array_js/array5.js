function filtrarMayoresDe(numeros, valorReferencia) {
    return numeros.filter(numero => numero > valorReferencia);
}

const numeros = [5, 10, 15, 20, 25];

const resultado = filtrarMayoresDe(numeros, 15);

console.log(resultado);