function elevarAlCuadrado(numeros) {
    return numeros.map(numero => numero ** 2);
}

const numeros = [1, 2, 3, 4, 5];

const resultado = elevarAlCuadrado(numeros);

console.log(resultado);